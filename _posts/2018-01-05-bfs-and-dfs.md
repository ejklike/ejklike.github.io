---
title: "파이썬을 사용한 그래프의 너비 우선 탐색과 깊이 우선 탐색 구현"
layout: post
tags: ['algorithm', 'data structure']
---

아래와 같은 그래프가 있다고 가정하자. 노드 `A`에서 시작하여 그래프의 모든 노드를 방문하려면 어떻게 해야 할까?

![]({{base}}/assets/20180106/graph.png "graph"){: width="230px"}

먼저, 그래프의 노드 간 연결관계를 표현해보자. 표현 방법으로는 크게 [Adjacency list (인접 리스트)](https://en.wikipedia.org/wiki/Adjacency_list)와 [Adjacency matrix (인접 행렬)](https://en.wikipedia.org/wiki/Adjacency_matrix)가 있다. 여기서는 인접 리스트를 사용해보았다.

```python
# undirected graph
graph = {'A': set(['B', 'C']),
         'B': set(['A', 'D', 'E']),
         'C': set(['A', 'F']),
         'D': set(['B']),
         'E': set(['B', 'F']),
         'F': set(['C', 'E'])}
```

> 노드 개수에 비해 엣지 개수가 훨씬 적은 그래프라면 인접 행렬보다는 인접 리스트를 사용하는 게 탐색에 효율적이다. 전체 노드가 아닌 연결된 노드만 살펴보면 되기 때문이다. 또한, 인접 리스트는 엣지 개수에 비례하는 메모리만 차지하는 장점이 있다. 단, 두 노드의 연결관계를 알고싶을 때는 인접 행렬이 효율적이다.

# 너비 우선 탐색 (Breadth-first-search, BFS)

![](https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif "https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif"){: width="270px"}

너비 우선 탐색은 깊이가 1인 노드들을 먼저 방문하고 나서, 그 다음에는 깊이가 2인 노드들, 깊이가 3인 노드들을 차례로 방문하다가 더이상 방문할 곳이 없으면 탐색을 마친다. 너비 우선 탐색은 그래프 내 모든 노드를 방문하고 싶을 때, 찾는 것을 발견할 때까지 모든 노드를 적어도 한 번은 방문하고 싶을 때 사용하면 좋다.

아래와 같이 시작 노드로부터 차례로 인접 노드들을 큐(queue)에 추가하는 방식을 사용해 구현할 수 있다.

```python
def bfs(graph, start):
    visited = []
    queue = [start]

    while queue:
        n = queue.pop(0)
        if n not in visited:
            visited.append(n)
            queue += graph[n] - set(visited)
    return visited
```

결과는 아래와 같다.

```python
>> bfs(graph, 'A')
['A', 'C', 'B', 'F', 'D', 'E']
```

### 두 노드 간 경로 탐색

위의 코드를 조금 수정하여 두 노드 간 가능한 모든 경로를 찾아보자.

```python
def bfs_paths(graph, start, goal):
    queue = [(start, [start])]
    result = []

    while queue:
        n, path = queue.pop(0)
        if n == goal:
            result.append(path)
        else:
            for m in graph[n] - set(path):
                queue.append((m, path + [m]))
    return result
```

너비 우선 경로 탐색을 진행하면 가장 먼저 찾은 경로가 최단 경로가 된다!

```python
>> bfs_paths(graph, 'A', 'F')
[['A', 'C', 'F'], ['A', 'B', 'E', 'F']]
>> bfs_paths(graph, 'D', 'F')
[['D', 'B', 'E', 'F'], ['D', 'B', 'A', 'C', 'F']]
```

# 깊이 우선 탐색 (Depth-first-search, DFS)

![](https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif "https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif"){: width="270px"}

깊이 우선 탐색은 이름 그대로 진행 가능한 노드가 없을 때까지 깊게 파고들며 방문하는 방식이며, 더이상 방문 가능한 노드가 없다면 이전의 위치로 돌아와 다른 방향으로 깊게 파고들며 방문한다. 매우 큰 그래프에서, 탐색을 시작한 노드로부터 너무 멀어지게 되면 즉시 그만두고 싶을 때 사용하면 효과적이다. 트리 순회 기법은 전부 깊이 우선 탐색이다.

과거 위치의 인접 노드보다 현재 위치의 인접 노드를 먼저 방문한다는 특징을 가지므로, 아래와 같이 스택(stack)을 사용해 구현할 수 있다.

```python
def dfs(graph, start):
    visited = []
    stack = [start]

    while stack:
        n = stack.pop()
        if n not in visited:
            visited.append(n)
            stack += graph[n] - set(visited)
    return visited
```

결과는 아래와 같다.


```python
>> dfs(graph, 'A')
['A', 'B', 'E', 'F', 'C', 'D']
```

### 두 노드 간 경로 탐색

위의 코드를 조금 수정하여 두 노드 간 가능한 모든 경로를 찾아보자.

```python
def dfs_paths(graph, start, goal):
    stack = [(start, [start])]
    result = []

    while stack:
        n, path = stack.pop()
        if n == goal:
            result.append(path)
        else:
            for m in graph[n] - set(path):
                stack.append((m, path + [m]))
    return result
```

```python
>> dfs_paths(graph, 'A', 'F')
[['A', 'C', 'F'], ['A', 'B', 'E', 'F']]
>> dfs_paths(graph, 'D', 'F')
[['D', 'B', 'A', 'C', 'F'], ['D', 'B', 'E', 'F']]
```

깊이 우선 탐색은 너비 우선 탐색과는 달리 최단 경로를 가장 먼저 찾지 못할 수도 있다.

### 출처

- <http://eddmann.com/posts/depth-first-search-and-breadth-first-search-in-python/>
- McDowell, G. L. (2016). Cracking the Coding Interview: 189 Programming Questions and Solutions. CareerCup, LLC.
- <http://blog.eairship.kr/269>