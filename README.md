# Description

This repository was created following [this link here](https://react-query.tanstack.com/overview) & [this](https://www.youtube.com/watch?v=vzLmQn19kS4&ab_channel=LeighHalliday).

Its main goal is to combine the `query` w/ `mutation` from `react-query` w/ additional of a `grid-system` from `@emotion`.

# Getting Started

- get your access token from: https://gorest.co.in.

- set your env.variable.

- yarn start.

# Features

- list

- add

- edit

- filter

# Stack

- `CRA Template`: for bootstrap.

- `lodash`: for helpers.

- `@emotion/styled`: for styling.

- `grid system`: for structuring css.

- `react-query`: for caching, fetch and update data.

# Complex Key

https://react-query.tanstack.com/guides/query-keys

When a query needs more information to uniquely describe its data, you can use an array with a string and any number of serializable objects to describe it. This is useful for:

```js
 // An individual todo
 useQuery(['todo', 5], ...)
 // queryKey === ['todo', 5]
 
 // And individual todo in a "preview" format
 useQuery(['todo', 5, { preview: true }], ...)
 // queryKey === ['todo', 5, { preview: true }]
 
 // A list of todos that are "done"
 useQuery(['todos', { type: 'done' }], ...)
 // queryKey === ['todos', { type: 'done' }]

```

# Parallel Queries

https://react-query.tanstack.com/guides/parallel-queries

If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks. Instead, React Query provides a useQueries hook, which you can use to dynamically execute as many queries in parallel as you'd like.

useQueries accepts an array of query options objects and returns an array of query results:

https://react-query.tanstack.com/guides/parallel-queries

```js
 function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }
```
# Dependent Queries

https://react-query.tanstack.com/guides/dependent-queries

Dependent (or serial) queries depend on previous ones to finish before they can execute. To achieve this, it's as easy as using the enabled option to tell a query when it is ready to run:

```js
 // Get the user
 const { data: user } = useQuery(['user', email], getUserByEmail)
 
 const userId = user?.id
 
 // Then get the user's projects
 const { isIdle, data: projects } = useQuery(
   ['projects', userId],
   getProjectsByUser,
   {
     // The query will not execute until the userId exists
     enabled: !!userId,
   }
 )
```

# Displaying Global Background Fetching Loading State

https://react-query.tanstack.com/guides/background-fetching-indicators

In addition to individual query loading states, if you would like to show a global loading indicator when any queries are fetching (including in the background), you can use the useIsFetching hook:

```js
 import { useIsFetching } from 'react-query'
 
 function GlobalLoadingIndicator() {
   const isFetching = useIsFetching()
 
   return isFetching ? (
     <div>Queries are fetching in the background...</div>
   ) : null
 }
 ```

# Infinite Queries

https://react-query.tanstack.com/guides/infinite-queries

Rendering lists that can additively "load more" data onto an existing set of data or "infinite scroll" is also a very common UI pattern. React Query supports a useful version of useQuery called useInfiniteQuery for querying these types of lists.

# Placeholder Query Data

Placeholder data allows a query to behave as if it already has data, similar to the initialData option, but the data is not persisted to the cache. This comes in handy for situations where you have enough partial (or fake) data to render the query successfully while the actual data is fetched in the background.

https://react-query.tanstack.com/guides/placeholder-query-data

```js
 function Todos() {
   const result = useQuery('todos', () => fetch('/todos'), {
     placeholderData: placeholderTodos,
   })
 }
```

# Initial Data from Cache

In some circumstances, you may be able to provide the initial data for a query from the cached result of another. A good example of this would be searching the cached data from a todos list query for an individual todo item, then using that as the initial data for your individual todo query:

https://react-query.tanstack.com/guides/initial-query-data#initial-data-from-cache

```js
function Todo({ todoId }) {
   const result = useQuery(['todo', todoId], () => fetch('/todos'), {
     initialData: () => {
       // Use a todo from the 'todos' query as the initial data for this todo query
       return queryClient.getQueryData('todos')?.find(d => d.id === todoId)
     },
   })
 }
```
