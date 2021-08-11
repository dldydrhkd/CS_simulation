N,M = map(int , input().split())
A = []
for _ in range(N):
    A.append(list(map(int,input().split())))
M,K = map(int, input().split())
B = []
for _ in range(M):
    B.append(list(map(int, input().split())))
C = [[0 for col in range(N)]for row in range(K)]
print(C)
i = 0
while i<N:
  j = 0
  while j<K:
    k = 0
    while k<M:
      C[i][j] += A[i][k] * B[k][j]
      k+=1
    j+=1
  i+=1
a = 0
while a<N:
  b = 0
  while b<K:
    print(C[a][b] , end = ' ')
    b+=1
  print()
  a+=1