---
title: "우분투 CUDA 10.1 환경에서 Tensorflow 2.0.0-beta1 설치 및 사용하기"
layout: post
tags: ['install', 'ubuntu', 'tensorflow', 'cuda', 'gpu']
---

최근 tensorflow `r2.0`이 배포되었다. 잠깐 살펴보니 API가 무척 pytorch스러워졌고, 호기심이 생겨서 바로 깔아보기로 결심했다.

공식문서에 따르면 아래 한 줄로 gpu용 tensorflow `r2.0` 설치가 끝난다.

```terminal
$ pip install tensorflow-gpu==2.0.0-beta1
```

하지만... 

내가 사용하는 서버에는 공식문서에서 요구하는 `CUDA 10.0`이 아닌 `CUDA 10.1`이 설치가 되어 있었고, 아래와 같은 오류를 뿜어냈다...ㅠㅠ

```python
2019-08-19 23:08:38.574010: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcuda.so.1
2019-08-19 23:08:38.607958: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1640] Found device 0 with properties:
name: GeForce GTX 1080 Ti major: 6 minor: 1 memoryClockRate(GHz): 1.582
pciBusID: 0000:81:00.0
2019-08-19 23:08:38.608115: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Could not dlopen library 'libcudart.so.10.0'; dlerror: libcudart.so.10.0: cannot open shared object file: No such file
or directory; LD_LIBRARY_PATH: /usr/local/cuda-10.0/extras/CUPTI/lib64:/usr/local/cuda-10.0/lib64:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64
2019-08-19 23:08:38.608196: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Could not dlopen library 'libcublas.so.10.0'; dlerror: libcublas.so.10.0: cannot open shared object file: No such file
or directory; LD_LIBRARY_PATH: /usr/local/cuda-10.0/extras/CUPTI/lib64:/usr/local/cuda-10.0/lib64:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64
2019-08-19 23:08:38.608266: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Could not dlopen library 'libcufft.so.10.0'; dlerror: libcufft.so.10.0: cannot open shared object file: No such file or
 directory; LD_LIBRARY_PATH: /usr/local/cuda-10.0/extras/CUPTI/lib64:/usr/local/cuda-10.0/lib64:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64
2019-08-19 23:08:38.608332: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Could not dlopen library 'libcurand.so.10.0'; dlerror: libcurand.so.10.0: cannot open shared object file: No such file
or directory; LD_LIBRARY_PATH: /usr/local/cuda-10.0/extras/CUPTI/lib64:/usr/local/cuda-10.0/lib64:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64
2019-08-19 23:08:38.608403: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Could not dlopen library 'libcusolver.so.10.0'; dlerror: libcusolver.so.10.0: cannot open shared object file: No such f
ile or directory; LD_LIBRARY_PATH: /usr/local/cuda-10.0/extras/CUPTI/lib64:/usr/local/cuda-10.0/lib64:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64
2019-08-19 23:08:38.608470: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Could not dlopen library 'libcusparse.so.10.0'; dlerror: libcusparse.so.10.0: cannot open shared object file: No such f
ile or directory; LD_LIBRARY_PATH: /usr/local/cuda-10.0/extras/CUPTI/lib64:/usr/local/cuda-10.0/lib64:/usr/local/cuda/extras/CUPTI/lib64:/usr/local/cuda/lib64
2019-08-19 23:08:38.615333: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcudnn.so.7
2019-08-19 23:08:38.615382: W tensorflow/core/common_runtime/gpu/gpu_device.cc:1663] Cannot dlopen some GPU libraries. Skipping registering GPU devices...
2019-08-19 23:08:38.615776: I tensorflow/core/platform/cpu_feature_guard.cc:142] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2 FMA
2019-08-19 23:08:38.908735: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x563ca768c010 executing computations on platform CUDA. Devices:
2019-08-19 23:08:38.908795: I tensorflow/compiler/xla/service/service.cc:175]   StreamExecutor device (0): GeForce GTX 1080 Ti, Compute Capability 6.1
2019-08-19 23:08:38.917134: I tensorflow/core/platform/profile_utils/cpu_utils.cc:94] CPU Frequency: 2194995000 Hz
2019-08-19 23:08:38.942626: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x563ca77a58e0 executing computations on platform Host. Devices:
2019-08-19 23:08:38.942710: I tensorflow/compiler/xla/service/service.cc:175]   StreamExecutor device (0): <undefined>, <undefined>
2019-08-19 23:08:38.942829: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1181] Device interconnect StreamExecutor with strength 1 edge matrix:
2019-08-19 23:08:38.942855: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1187]
```

오류 메시지를 찬찬히 읽어보면, GPU 인식은 하지만 cuda와 관련된 library 파일을 찾지 못하였기에 CPU를 사용한다는 내용이다.

검색해보니 딱히 그렇다할 해법이 나오진 않았고, 어떻게 할까 고민하다가 시간을 많이 할애하긴 아까워서 아래와 같은 **야매 편법**을 썼다. 
(CUDA `10.1`이나 `10.0`이나 파일 내용이 크게 다르진 않을 것 같아서... 더 좋은 방법이 있으면 제보해주세요!)

### 1. CUDA 10.0 폴더를 강제로 만들어준다.

CUDA 10.1 폴더를 CUDA 10.0에 해당하는 이름으로 복사-붙여넣기한다.

```
sudo cp -r /usr/local/cuda-10.1 /usr/local/cuda-10.0
```

### 2. 오류 메시지에서 없다고 말하는 파일들을 강제로 만들어준다.

`LD_LIBRARY_PATH` 경로에서 `lib*.so.10.1*`에 해당하는 파일을 찾아 `lib*.so.10.0`이라는 이름의 심볼릭 링크를 만든다.

예를 들어, 나의 경우는 다음과 같았다.

```terminal
$ sudo ln -s /usr/local/cuda-10.0/lib64/libcudart.so.10.1.168 /usr/local/cuda-10.0/lib64/libcudart.so.10.0
$ sudo ln -s /usr/local/cuda-10.0/lib64/libcufft.so.10.1.168 /usr/local/cuda-10.0/lib64/libcufft.so.10.0
$ sudo ln -s /usr/local/cuda-10.0/lib64/libcurand.so.10.1.168 /usr/local/cuda-10.0/lib64/libcurand.so.10.0
$ sudo ln -s /usr/local/cuda-10.0/lib64/libcusolver.so.10.1.168 /usr/local/cuda-10.0/lib64/libcusolver.so.10.0
$ sudo ln -s /usr/local/cuda-10.0/lib64/libcusparse.so.10.1.168 /usr/local/cuda-10.0/lib64/libcusparse.so.10.0
$ sudo ln -s /usr/lib/x86_64-linux-gnu/libcublas.so.10.2.0.168 /usr/local/cuda-10.0/lib64/libcublas.so.10.0
```

### 3. `PATH`, `LD_LIBRARY_PATH`를 수정한다.

각자 환경에 따라 `.bashrc` (혹은 `.zshrc`)에서  `PATH`와 `LD_LIBRARY_PATH` 부분의 `cuda-10.1` 부분을 `cuda-10.0`으로 수정한다.

```
...
export PATH=/usr/local/cuda-10.0/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-10.0/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-10.0/extras/CUPTI/lib64:$LD_LIBRARY_PATH
...
```

수정한 결과를 적용한다.

```terminal
$ source ~/.bashrc
# or
$ source ~/.zshrc
```



그리고 결과는... 성공! 얏호!

```python
2019-08-19 23:17:01.436618: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcuda.so.1
2019-08-19 23:17:01.577632: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1640] Found device 0 with properties:
name: GeForce GTX 1080 Ti major: 6 minor: 1 memoryClockRate(GHz): 1.582
pciBusID: 0000:81:00.0
2019-08-19 23:17:01.583128: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcudart.so.10.0
2019-08-19 23:17:01.583425: I tensorflow/stream_executor/platform/default/dso_loader.cc:53] Successfully opened dynamic library libcublas.so.10.0
2019-08-19 23:17:01.603319: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcufft.so.10.0
2019-08-19 23:17:01.609057: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcurand.so.10.0
2019-08-19 23:17:01.643251: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcusolver.so.10.0
2019-08-19 23:17:01.648362: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcusparse.so.10.0
2019-08-19 23:17:01.713525: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcudnn.so.7
2019-08-19 23:17:01.713599: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1763] Adding visible gpu devices: 0
2019-08-19 23:17:01.715895: I tensorflow/stream_executor/platform/default/dso_loader.cc:42] Successfully opened dynamic library libcudart.so.10.0
2019-08-19 23:17:02.160156: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1181] Device interconnect StreamExecutor with strength 1 edge matrix:
2019-08-19 23:17:02.160214: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1187]      0
2019-08-19 23:17:02.195286: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1200] 0:   N
2019-08-19 23:17:02.206861: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1326] Created TensorFlow device (/job:localhost/replica:0/task:0/device:GPU:0 with 7986 MB memory) -> physical GPU (device: 0, name:
 GeForce GTX 1080 Ti, pci bus id: 0000:81:00.0, compute capability: 6.1)
```

CPU로 37초 걸리던 학습이 GPU를 사용하니 1~2초로 줄었다. 굿굿!
