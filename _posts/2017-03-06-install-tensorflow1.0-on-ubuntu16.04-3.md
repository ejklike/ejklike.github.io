---
title: "우분투 16.04에 텐서플로 1.0 설치하기 (3) Tensorflow 설치"
layout: post
tags: ['install', 'ubuntu', 'tensorflow', 'nvidia', 'gpu']
---

대망의 텐서플로 설치 포스트다. [첫 번째 포스트]({{ BASE_PATH }}{{ page.previous.previous.url }})에서 Nvidia 관련 소프트웨어 설치하고, [두 번째 포스트]({{ BASE_PATH }}{{ page.previous.url }})에서 파이썬 3를 위한 Anaconda를 설치하고, tensorflow를 위한 Bazel을 설치했다.

Tensorflow 1.0을 설치하는 방법은 크게 두 가지로, `pip`를 사용하는 방법과 Github에서 소스코드를 받아 Bazel로 컴파일하는 방법이 있다 ([공식문서](https://www.tensorflow.org/install/install_sources) 참고). 여기서 '컴파일'이나 '빌드'라는 단어가 무섭게 느껴진 사람은 안전하게 `pip`를 사용하는 방법을 택하자. 용기가 있는 사람이나 이런 작업에 익숙한 사람은 조금 더 나은 성능을 위해 두 번쨰 방법을 시도해도 좋다.


# 1. pip를 사용한 tensorflow 설치

너무 간단하니 놀라지 말자.

## 1-1. 설치

터미널에 `pip install tensorflow-gpu`라고 입력하면 끝이다.

## 1-2. 테스트

파이썬에서 아래와 같이 설치 테스트를 해보자.

- 텐서플로 불러오기: 아래와 같이 CUDA 라이브러리를 잘 불러오면 성공이다.

```python
>>> import tensorflow as tf
I tensorflow/stream_executor/dso_loader.cc:135] successfully opened CUDA library libcublas.so.8.0 locally
I tensorflow/stream_executor/dso_loader.cc:135] successfully opened CUDA library libcudnn.so.5 locally
I tensorflow/stream_executor/dso_loader.cc:135] successfully opened CUDA library libcufft.so.8.0 locally
I tensorflow/stream_executor/dso_loader.cc:135] successfully opened CUDA library libcuda.so.1 locally
I tensorflow/stream_executor/dso_loader.cc:135] successfully opened CUDA library libcurand.so.8.0 locally
```

- 간단한 연산 돌려보기: GPU가 올바르게 인식되었고, 결과도 제대로 출력된다.

```python
>>> a = tf.constant(3)
>>> b = tf.constant(6)
>>> with tf.Session() as sess:
...     print(sess.run(a+b))
... 
I tensorflow/core/common_runtime/gpu/gpu_device.cc:885] Found device 0 with properties: 
name: GeForce GTX 970
major: 5 minor: 2 memoryClockRate (GHz) 1.304
pciBusID 0000:05:00.0
Total memory: 3.94GiB
Free memory: 3.59GiB
I tensorflow/core/common_runtime/gpu/gpu_device.cc:906] DMA: 0 
I tensorflow/core/common_runtime/gpu/gpu_device.cc:916] 0:   Y 
I tensorflow/core/common_runtime/gpu/gpu_device.cc:975] Creating TensorFlow device (/gpu:0) -> (device: 0, name: GeForce GTX 970, pci bus id: 0000:05:00.0)
9
>>> 
```

> 만약 session 실행 단계에서 아래와 같은 경고 메시지가 뜬다고 해서 너무 놀라지는 말자. 깃헙 소스코드를 통해 설치하면 더 빠를 것이라는 내용의 단순 경고이다 (관심있는 사람은 [#7778 이슈](https://github.com/tensorflow/tensorflow/issues/7778) 참고).
>
> ```
> W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE3 instructions, but these are available on your machine and could speed up CPU computations.
> W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE4.1 instructions, but these are available on your machine and could speed up CPU computations.
> W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use SSE4.2 instructions, but these are available on your machine and could speed up CPU computations.
> W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use AVX instructions, but these are available on your machine and could speed up CPU computations.
> W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use AVX2 instructions, but these are available on your machine and could speed up CPU computations.
> W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn't compiled to use FMA instructions, but these are available on your machine and could speed up CPU computations.
> ```
> 
> 사실 편하게 살고 싶어서 `pip`로 설치했는데, 저 문구를 보니 두 번째 방법으로 설치해보고 싶어졌다. `pip uninstall tensorflow-gpu`를 실행하여 설치된 내용을 지우고 두 번째 방법으로 넘어갔다.


# 2. Github으로부터 다운받아 설치

먼저 텐서플로 저장소로부터 소스코드를 다운받자. 적당한 폴더 위치에서 아래와 같이 터미널에 입력하고, 파일복사가 끝나고 나면 새로 생기는 `tensorflow`라는 폴더로 이동하자.

```terminal
$ sudo apt-get install git
$ git clone https://github.com/tensorflow/tensorflow
$ cd tensorflow
```

> 만약 `master` 소스코드 대신 `r1.0` 버전 소스코드로 컴파일하고 싶다면 `git checkout r1.0`을 입력하자.

## 2-1. 설정 입력

`tensorflow` 폴더에서 아래와 같이 `./configure`라고 입력하면 파이썬이나 CUDA, cuDNN의 경로 등에 대해 묻는다. `y`나 `n` 입력에 주의가 필요하고, 이전에 설치한 경로와 다른 경로가 `Default` 설정으로 뜬다면 이전에 설치한 경로를 입력해준다 (예: `/usr/local/cuda-8.0`)

```
$ ./configure
Please specify the location of python. [Default is /home/dmlab/anaconda3/bin/python]: 
Please specify optimization flags to use during compilation [Default is -march=native]: 
Do you wish to use jemalloc as the malloc implementation? (Linux only) [Y/n] y
jemalloc enabled on Linux
Do you wish to build TensorFlow with Google Cloud Platform support? [y/N] n
No Google Cloud Platform support will be enabled for TensorFlow
Do you wish to build TensorFlow with Hadoop File System support? [y/N] n
No Hadoop File System support will be enabled for TensorFlow
Do you wish to build TensorFlow with the XLA just-in-time compiler (experimental)? [y/N] n
No XLA JIT support will be enabled for TensorFlow
Found possible Python library paths:
  /home/dmlab/anaconda3/lib/python3.6/site-packages
Please input the desired Python library path to use.  Default is [/home/dmlab/anaconda3/lib/python3.6/site-packages]
Using python library path: /home/dmlab/anaconda3/lib/python3.6/site-packages
Do you wish to build TensorFlow with OpenCL support? [y/N] n
No OpenCL support will be enabled for TensorFlow
Do you wish to build TensorFlow with CUDA support? [y/N] y
CUDA support will be enabled for TensorFlow
Please specify which gcc should be used by nvcc as the host compiler. [Default is /usr/bin/gcc]: 
Please specify the CUDA SDK version you want to use, e.g. 7.0. [Leave empty to use system default]: 
Please specify the location where CUDA  toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]: /usr/local/cuda-8.0
Please specify the Cudnn version you want to use. [Leave empty to use system default]: 
Please specify the location where cuDNN  library is installed. Refer to README.md for more details. [Default is /usr/local/cuda-8.0]: 
Please specify a list of comma-separated Cuda compute capabilities you want to build with.
You can find the compute capability of your device at: https://developer.nvidia.com/cuda-gpus.
Please note that each additional compute capability significantly increases your build time and binary size.
[Default is: "3.5,5.2"]: 
```

## 2-2. pip 패키지 빌드

아래 명령어를 입력하여 텐서플로 GPU 버전 패키지를 빌드하자. RAM을 많이 잡아먹는다고 하니, 랩 용량이 적다면 아래 명령어 뒤에 `--local_resources 2048,.5,1.0` 옵션을 붙여주자. 32GB에서 약 15분이 소요됐으니 여유롭게 기다리자.

```terminal
$ bazel build --config=opt --config=cuda //tensorflow/tools/pip_package:build_pip_package
...
...
INFO: Elapsed time: 868.698s, Critical Path: 661.03s
```

위 빌드가 끝나면 `build_pip_package`라는 이름의 스크립트가 생긴다. 아래 명령어를 입력하여 스크립트를 실행하면 `/tmp/tensorflow_pkg` 폴더에 `.whl` 파일을 빌드한다.

```terminal
$ bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg
```

## 2-3. pip 패키지 설치

아래와 같이 터미널에 입력하되, 별표시 이전까지만 입력하고 `tab`키를 누르자. 나머지 파일명이 자동완성된다. (빌드되는 파일명이 일정하지 않아 이렇게 해야한다.)

```terminal
$ pip install /tmp/tensorflow_pkg/tensorflow*
```

아나콘다에서 한 가지 빠진 파일이 있어([#5017 이슈](https://github.com/tensorflow/tensorflow/issues/5017) 참고) 아래의 명령어로 붙여넣어준다. (`your_id` = 우분투 로그인 계정명)

```terminal
$ cp /usr/lib/x86_64-linux-gnu/libstdc++.so.6 /home/your_id/anaconda3/lib/
```

## 2-4. 테스트

1-2.를 참고하여 설치가 제대로 됐는지 테스트해보자. 

> `ImportError: cannot import name pywrap_tensorflow` 오류가 뜬다면 파이썬을 `tensorflow` 폴더 밖에서 실행하자. ([#3217 이슈](https://github.com/tensorflow/tensorflow/issues/3217))

> `kernel version 367.44.0 does not match DSO version 352.99.0`과 같은 오류가 뜬다면 재부팅을 해보자! ([#4349 이슈](https://github.com/tensorflow/tensorflow/issues/4349))

> 원격 Jupyter Notebook Server 접속시 `ImportError: libcudart.so.8.0: cannot open shared object file: No such file or directory` 오류가 뜬다면 `sudo ldconfig /usr/local/cuda-8.0/lib64`를 실행해보자. ([#5343 이슈](https://github.com/tensorflow/tensorflow/issues/5343))