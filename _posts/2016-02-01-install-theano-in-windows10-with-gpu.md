---
title: Windows 10에서 cuda 7.5와 theano 설치 (GPU 사용)
layout: post
tags: ['windows','cuda','nvidia','theano','gpu','python']
---

우분투에 Nvidia GPU 기반 theano 설치를 완료한 뒤, Windows 10에도 도전해보기로 했다. 설치는 [https://vanishingcodes.wordpress.com/2015/10/25/installing-cuda-7-5-and-pycuda-on-windows-for-testing-theano-with-gpu/](https://vanishingcodes.wordpress.com/2015/10/25/installing-cuda-7-5-and-pycuda-on-windows-for-testing-theano-with-gpu/)를 참고하여 진행하였다. 사소한 configuration을 제외하면 큰 문제는 없었다. 순서는 다음과 같다.

## 1. Visual Studio 2013 설치

* cuda 7.5 toolkit은 아직 VS2015를 지원하지 않으므로 주의
* 최소한의 설치옵션으로 진행해도 무방

## 2. Visual Studio 환경변수 설정

* 환경변수 `Path` 변수에 아래 내용 추가

{% highlight text %}
C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\bin\;C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE
{% endhighlight %}

## 3. Cuda 7.5 toolkit 설치

## 4. Anaconda 설치

* python 2.7 기준으로 설치

## 5. Python dependency 설치

* 명령 프롬프트에서 `conda install mingw libpython` 입력

## 6. Theano 설치

* anaconda에 등록된 버전 설치: `conda install theano`
* (옵션) 만약, 최신 버전을 설치하고자 한다면 theano 공식 github 참고하여 설치

## 7. Theano 환경설정파일 만들기

* 아래 내용의 `.theanorc.txt` 파일을 `$HOME` 폴더에 만듦
* 참고로, `$Home` 폴더는 설정을 건드리지 않았다면 `C:\Users\로그인이름`일 것임 ([확인하는법](http://blogs.technet.com/b/heyscriptingguy/archive/2015/04/27/powertip-find-user-39-s-home-directory-in-powershell.aspx))

{% highlight text %}
[global]
floatX = float32
device = gpu
[nvcc]
fastmath = True
{% endhighlight %}

> 원문에는 `flags`와 `compiler_bindir` 경로를 설정하도록 되어있었지만, 이는 나에게 아래와 같은 오류를 주었다...
> 
> ValueError: Theano nvcc.flags support only parameter/value pairs without space b
> etween them. e.g.: '--machine 64' is not supported, but '--machine=64' is suppor
> ted. Please add the '=' symbol. nvcc.flags value is ''C:\Anaconda2\lib''
> 
> [https://www.kaggle.com/c/datasciencebowl/forums/t/12677/install-theano-on-windows-8-1-with-gpu-enabled-pycuda-installation-problems](https://www.kaggle.com/c/datasciencebowl/forums/t/12677/install-theano-on-windows-8-1-with-gpu-enabled-pycuda-installation-problems)의 맨 마지막 코멘트를 참고하여 경로설정을 없앴더니 해결되었다(!)


## 8. Test: theano가 GPU를 사용하는지 확인

* 아래의 코드를 실행시켜서 `Used the gpu`가 뜨면 성공!

{% highlight python %}
from theano import function, config, shared, sandbox
import theano.tensor as T
import numpy
import time

vlen = 10 * 30 * 768  # 10 x #cores x # threads per core
iters = 1000

rng = numpy.random.RandomState(22)
x = shared(numpy.asarray(rng.rand(vlen), config.floatX))
f = function([], T.exp(x))
print(f.maker.fgraph.toposort())
t0 = time.time()
for i in xrange(iters):
    r = f()
t1 = time.time()
print("Looping %d times took %f seconds" % (iters, t1 - t0))
print("Result is %s" % (r,))
if numpy.any([isinstance(x.op, T.Elemwise) for x in f.maker.fgraph.toposort()]):
    print('Used the cpu')
else:
    print('Used the gpu')
{% endhighlight %}