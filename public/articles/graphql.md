# An introduction to GraphQL & Django

## About me

``` graphql
{
  "data": {
    "user": {
      "firstName": "Mehdi",
      "lastName": "Raddadi",
      "company": "Polyconseil",
      "job": "Sofware engineer",
      "technologies": {
        {"name": "Django"},
        {"name": "GraphQL"},
        {"name": "Vue"}
      }
    }
  }
}
```

## Introduction

### Web
The web is constantely evolving. We used to have a server communicating with only one type of clients, mostly browsers.

// schema browsers

Nowadays, the same server has to be able to deliver content to very different type of clients, from the browsers to your
toaster passing by your phone. Also, the service being interogated as changed a bit, once we had one or several instances of the same
service, now, a frontal service could be discussing with tens of others services.

// schema multi archi

To answer this problem, an architecture is widely used: REST and more generally, APIs. Be warned, we don't want to enter the war of REST vs GraphQl,
we think that you can already find plenty of resources on the subject. As strong as REST can be, it has a few shortcomings:
https://developer.github.com/v4/guides/migrating-from-rest/

- Not a standard: everyone can implement it in a different way so you are never sure how you should interact with it.
- Extensive routing: if you're requesting nested data, you may have to create a route per resource.
- Too much/little data: if you want only the data you need, you'll have to create a specific endpoint for it,
it is time consuming. If you want a specific information, most of the time, you'd just call the corresponding enpoind and trim the received data.

### GraphQL
So what is GraphQL ? [GraphQL](http://graphql.org/) is a query language for APIs. It was developped by Facebook in 2012 before being open sourced in 2015.

> GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.
> GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

At [Polyconseil](https://www.polyconseil.fr/), we are very fond of new technologies and we try our best to test new stacks every now and then to see if we can adapt them to our projects.
As such, we looked into GraphQL, which has been a hot topic for quite a while. We had a lot of discussion between us as we are already using REST with [Django Rest Framework](http://www.django-rest-framework.org/) in several places.
Because we had a bit of a hard time to find an objective review of the technology, we decided that it was best to gather more resources and get our own feeling down in an article.
The goal of this article is to introduce you to the base concepts of GraphQL and what are the advantages of such a technology.
To do that, we are going to use a well known example and we will try to construct a ToDo application.

## A query language

### Web SQL

As said previously, graphQL is a querying language. It is agnostic of the database as it does not connect directly to it. 
GraphQL is more or less a DSL on top of your own backend data fetching logic. In fact, the schema exposed over GraphQL 
will likely not mirror your database exactly. It provides a way to describe a request for structured data, 
but it is then up to the backend to fulfill that request. You can view it as the **web SQL**. Here is what a GraphQL query would look like:

``` graphql
query {
  allTodos {
    id
    createdAt
    creator {
      id
    }
    description
    finishedAt
    todolist {
      id
    }
  }
}
```

### Objects

GraphQL is a strongly type language. The types are used to define objects which you will be able to query throught your api.
For instance, below, we are defining two user defined types, `Todo` and `TodoList` created based on the standard types: Integer, String, Float,
etc.

``` graphql
type Todo {
  id: ID
  description: String
  createdAt: Datetime
  finishedAt: Datetime
  creator: User
  todolist: TodoList
}
```
Also, as you can see, we can define links between two objects to explain how they relate to each other. Such that, it will be possible
to query one from the other.

``` graphql
type TodoList {
  id: ID
  title: String
  createdAt: Datetime
  creator: User
  todos: [Todo]
}
```

### What can I request from my API ?

GraphQL has three means to ask for data from the servers, which we will dive into:
- Queries
- Mutations
- Subscriptions

#### Queries

Queries are you equivalent of you usual GET request. GraphQL does not assume anything
about the transport layer but if you want to read an object from the server then,
queries is what you are looking for. Hereafter is a simple query, we are asking the
server the user with the id number 2 and we want to know about his username, firstName,
lastName and email.

``` graphql
query{
  user(id:2){
    id
    username
    firstName
    lastName
    email
  }
  todolist(id:1){
    id
    todos{
      id
      creator{
        id
        username 
      }
    }
  }
}
```

One strength of GraphQL is the ability to know exactly the data that you will receive.
Indeed, compare the request we sent to the following response.

``` graphql
{
  "data": {
    "user": {
      "id": "2",
      "username": "eclar",
      "firstName": "Mehdi",
      "lastName": "Raddadi",
      "email": "mehdi.raddadi@polyconseil.fr"
    }
  }
}
```

As you can see, we are getting **exactly** the same shape of data. This is one strong suit: "What you ask is what you get".

You could also fetch multiple objects with only on query with the following:
``` graphql
query{
  user(id:2){
    id
    username
    firstName
    lastName
    email
  }
  todolist(id:1){
    id
    todos{
      id
      creator{
        id
        username 
      }
    }
  }
}
```

> Be carefull when manipulating the queries, always remember that GraphQL is a graph so
> objects can be asked from the parents to the children, not the opposite.

No overfetching/underfetching.

#### Mutations

Mutations are all requests which are not read only actions. Every time you need something executed on the server, you will write a mutation
for it, being: authentication, creating, updating objects, launching time consuming tasks, cron, etc.

This is how you would create a user with a mutation:

``` graphql
mutation{
  createUser(newUser:{username:"eclar", password:"djangoCong2018", email:"mehdi.raddadi@polyconseil.fr", firstName:"Mehdi", lastName:"Raddadi"}){
    user{
      username
      id
      firstName
      lastName
    }
  }
}
```

``` graphql
{
  "data": {
    "createUser": {
      "user": {
        "username": "eclar",
        "id": "2",
        "firstName": "Mehdi",
        "lastName": "Raddadi"
      }
    }
  }
}
```

Same principles as before, you get exactly what you asked for. Moreover, you will get a nice and cool error if you ever pass an argument
of the wrong type or if you forget something because of the strong interface contract created by the GraphQL schema.

// example d'erreur

#### Susbcriptions

Subscriptions can be seen as the asynchronous queries. Basically, they follow the same rules as a query but instead of the client making
the request to the server, the client subscribe to a pub/sub system asking to be made aware of any changes on specific objects and field.
So, everytime the data is updated, the server will notify the client with the appropriate data and the client can update.

For example, the next subscription is subscribing to changes on a specific user for the field id, username, etc. Everytime this user
is updated, the client will be notified with the data containing all the fields asked for.

``` graphql
subscription{
  userSubscription(
    action: UPDATE,
    operation: SUBSCRIBE,
    channelId: "GthKdsYVrK!WxRCdJQMPi",
    id: 5,
    data: [ID, USERNAME, FIRST_NAME, LAST_NAME, EMAIL, IS_SUPERUSER]
  ){
    ok
    error
    stream
  }
}
```

``` graphql
{
  "stream": "users",
  "payload": {
    "action": "update",
    "model": "auth.user",
    "data": {
      "id": 5,
      "username": "eclar",
      "first_name": "Mehdi",
      "last_name": "Raddadi",
      "email": "mehdi.raddadi@polyconseil.fr",
      "is_superuser": false
    }
  }
}
```

### Core principles

Let's sum up the core principles as expressed by Facebook in their RFC:

- Hierachical
- Product-centric
- Strong-typing
- Client-specific queries
- Introspective

### So why ?

What you want is what you get
API evolution
Self documentation
One endpoint

## Graphene

Now that we have seen what is GraphQL, let's try to create a simple Todo application in python with Graphene and Django. You can start by
initiating a Django project and adding `graphene-django` to the project. If you want to take a look at the demo project, you can clone
[this repository](https://github.com/eclar/django_graphql). I will try to update it as I write more about GraphQL in the following months.

### Create the models

The first thing we need to do is to create the application's models of the data that we will be querying from our application:

``` python
# app/models.py
class TodoList(models.Model):
    title = models.CharField(max_length=128, default='untitled')
    created_at = models.DateField(auto_now=True)
    creator = models.ForeignKey(User, null=True, related_name='todo_lists', on_delete=models.CASCADE)


class Todo(models.Model):
    description = models.CharField(max_length=256)
    created_at = models.DateField(auto_now=True)
    finished_at = models.DateField(null=True, blank=True)
    creator = models.ForeignKey(User, null=True, related_name='todos', on_delete=models.CASCADE)
    todolist = models.ForeignKey(TodoList, related_name='todos', on_delete=models.CASCADE)
```

### Create the application schema

Once that is done, we can create the schema, which will create the associated schema. For simplicity, we chose to
use `DjangoObjectType` which will convert our model to a GraphQL type. It is more or less the same principle as
the Django Rest Framework serializers if you're familiar with them.

``` python
# app/schema.py
class TodoType(DjangoObjectType):
    class Meta:
        model = todo_models.Todo


class TodoListType(DjangoObjectType):
    class Meta:
        model = todo_models.TodoList
```

### Create your first queries

Now that we have our schema, we need to implement our resolvers. Remember, the schema does not suppose how you fetch the data
only that it is available. The how is why the resolvers are here !

``` python
# app/schema.py
class Queries(object):
    todo = graphene.Field(
        TodoType,
        id=graphene.Int(),
    )
    all_todos = graphene.List(TodoType)

    def resolve_todo(self, info, **kwargs):
        todo_id = kwargs.get('id')

        if todo_id is not None:
            return todo_models.Todo.objects.get(pk=todo_id)
        return None

    def resolve_all_todos(self, info, **kwargs):
        return todo_models.Todo.objects.all()
```

We have just created our two first queries which will enable us to get our todos.

### Create your first mutations

However, before getting our data, we need first to create our todos and lists and save them in our database.

// explain package usage, show more complexe mutation

``` python
# app/schema.py
class CreateTodoList(DjangoSerializerMutation):
    class Meta:
        serializer_class = todo_serializers.TodoListSerializer


class Mutations(graphene.ObjectType):
    create_todo_list = CreateTodoList.CreateField()
    update_todo_list = CreateTodoList.UpdateField()
    delete_todo_list = CreateTodoList.DeleteField()
```

### Create your global schema

``` python
# project/schema.py
import graphene

from graphene_django.debug import DjangoDebug

from graphql_demo.todos import schema as todo_schema
from graphql_demo.users import schema as users_schema

class RootQuery(todo_schema.Queries, users_schema.Queries, graphene.ObjectType):
    debug = graphene.Field(DjangoDebug, name='__debug')

class RootMutations(todo_schema.Mutations, users_schema.Mutations, graphene.ObjectType):
    pass

schema = graphene.Schema(query=RootQuery, mutation=RootMutations)
```

### Adapt you settings

``` python
# settings.py
...
VENDORS_APPS = (
  ...
  'graphene_django',
   ...
)
 ...
# Graphene configuration
GRAPHENE = {
   'SCHEMA': 'graphql_demo.schema.schema',  # Where your Graphene schema lives
   'MIDDLEWARE': [
    'graphene_django.debug.DjangoDebugMiddleware',
  ],
}
```

### Create the API url

``` python
# urls.py
from graphene_django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
```



## Why GraphQL

Now that our readers have a better understanding on how to setup a GraphQL endpoint,
we are going to dive a bit deeper in the reasons why a team should or should not use GraphQL.

### Ease to use

As you saw, GrapQL is fairly easy to setup. 

========================================NOTES============================================

Misconception

What about security?

Again, this is completely up to your backend and it not a primary concern of GraphQL. We will see an authenticated resolver below (the function that fetches and returns data). There seem to be two predominant approaches to handling a client attempting to access something they are not authorized to view.

## Difference with REST
Don't be fooled by the title or what you can hear around you. GraphQL is not a replacement for REST api as they are not used with the same principles behind them.

Often, people forget that choosing a certain technology to anwser a problem has already a sets of conditions. Obviously, the architecture of your projects should be thought with which stack you intend to use. If you want to benefit from all the strength of your stack 

This part goal is to highlight why either one is good for you.

## Plus

it is a way to query multiple data sources from a single endpoint
https://dev-blog.apollodata.com/the-business-case-for-graphql-cc7a2b93148d

Multiple data from several endpoints to be combined intelligently.

These companies are very diverse, but they have one thing in common — they all have at least one of the following:
- They have more than one client (e.g. web + iOS)
- They have a mobile client and care about latency and bandwidth
- They are moving to a microservices architecture
- Their REST API has gotten so complicated that it’s a significant drag on product development
- They want to decouple frontends and backends to speed up development
[source](https://dev-blog.apollodata.com/why-graphql-is-the-future-3bec28193807)

Clean layer between frontend and back as it is the same one everywhere.

GraphQL brings order to the chaos:
- Clean API between backends and frontends
- Less communication overhead and fewer meetings
- No more time spent writing API documentation
- No more time spent trying to figure out an API
- Great tooling for your API

Enter GraphQL. Using GraphQL to power our backend, we were able to provide the mobile client exactly what it needed for each request, with no additional bloat, and were able to optimize the database and cache layer to do everything in an extremely performant way.
https://0x2a.sh/from-rest-to-graphql-b4e95e94c26b

# Minus

# Sources

[From REST to GraphQL](https://0x2a.sh/from-rest-to-graphql-b4e95e94c26b)
