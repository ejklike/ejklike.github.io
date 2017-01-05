---
title: "Windows 10에 tensorflow 설치하기" 
layout: post
tags: ['tensorflow','windows','cpu','gpu','cuda','python']
---

12월 중순 무렵 tensorflow에서 Windows를 공식 지원한다고 발표하였다. 이제 Docker와 같은 번거로운 설치법이 필요 없다. [tensorflow 공식문서](https://www.tensorflow.org/get_started/os_setup#pip_installation_on_windows)를 참고하여 Windows 10에 tensorflow 0.12버전를 설치해봤다. 매우 쉽다.


## GPU 버전을 설치할까? CPU only 버전을 설치할까?

먼저, 본인 PC에 설치된 GPU가 tensorflow 사용 가능한 GPU인지 확인해야 한다. (GPU가 없다면 당연히 CPU only 버전...) 아래 두 가지 조건을 충족하면 GPU 버전의 tensorflow를 설치하여 사용할 수 있다. 그렇지 않다면 GPU 버전의 tensorflow는 무용지물.

1. CUDA를 지원하는 GPU인가?
 - [여기](https://developer.nvidia.com/cuda-gpus)에 접속하여 본인 PC에 설치된 GPU를 찾아보자. 
 - 본인의 GPU가 목록에 있다면, 그 옆에 Compute Capability를 확인하고 2번으로 고고.

2. NVidia Compute Capability 3.0 이상인가?
  - [Tensorflow 공식문서](https://www.tensorflow.org/get_started/os_setup#optional_install_cuda_gpus_on_linux)에 의하면 CUDA를 지원하더라도 NVidia Compute Capability가 3.0 이하이면 tensorflow를 사용할 수 없다.


## 0. CUDA toolkit, cuDNN 설치 (GPU 버전을 설치하는 경우에 한함)

위에서 확인한 결과 CUDA 사용 가능하고 Compute Capability 3.0 이상인 GPU가 장착되어있다면 Cuda toolkit과 cuDNN을 설치하여 tensorflow 설치를 위한 준비를 하자. (CPU only 버전을 설치한다면 넘어가자.)

### CUDA toolkit 8.0 설치

<https://developer.nvidia.com/cuda-downloads>에서 Windows용 8.0 버전을 다운로드하여 설치한다. 이 때, CUDA가 설치되는 경로를 잘 기억해둬야 cuDNN 설치가 편해진다. 나의 경우는 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v8.0` 이었다.

### cuDNN 5.1 설치

<https://developer.nvidia.com/cudnn>에서 cuDNN 5.1 버전을 다운로드한다. (CUDA와 달리 계정을 만들어야 한다.) 다운로드한 파일의 압축을 풀면 `cuda`라는 폴더가 있고, 이 안에 세 개의 폴더가 있다. 

자, 이제 CUDA가 설치된 경로인 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v8.0`에 같은 이름의 세 폴더가 존재하는지 확인한다. 존재한다면 압축 해제했던 `cuda` 폴더 안의 세 폴더를 CUDA가 설치된 경로인 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v8.0`에 붙여넣기 한다.

이제 GPU 버전의 tensorflow를 위한 준비과정은 끝났다!

## 1. Anaconda 설치

<https://www.continuum.io/downloads>에서 *선호하는* 파이썬 버전의 설치파일을 다운받는다.

명령 프롬프트(`cmd`)에서 `python`을 입력했을 때 아래와 같이 나타나면 설치 성공이다. (아래는 python 3.5 기준 성공화면)

```posh
C:\> python
Python 3.5.2 |Continuum Analytics, Inc.| (default, Jul  5 2016, 11:41:13) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

> 선호하는 파이썬 버전이 없다면 Python 3를 다운받자. 이는 예외상황(예: Python 3에서 작동하지 않는 Python 2 전용 패키지를 사용)이 없다는 가정 하의 추천이다. 만약 파이썬 버전 선택에 대해 더 알아보고 싶다면 [이 글](http://bit.ly/python2-or-python3)을 읽어보자.

## 2. Tensorflow 설치

아래 명령어를 실행하여 Tensorflow를 설치한다.

```posh
# CPU only version
C:\> pip install --upgrade https://storage.googleapis.com/tensorflow/windows/cpu/tensorflow-0.12.0-cp35-cp35m-win_amd64.whl
# GPU version
C:\> pip install --upgrade https://storage.googleapis.com/tensorflow/windows/gpu/tensorflow_gpu-0.12.0-cp35-cp35m-win_amd64.whl
```

> 만약 설치가 이미 되어있다는 문구와 함께 오류(나의 경우는 `Found existing installation: setuptools 27.2.0. Cannot remove entries from nonexistent file c:\users\dmlab\anaconda3\lib\site-packages\easy-install.pth`와 같았음)가 난다면, `--ignore-installed` 태그를 뒤에 붙여서 재시도해보자. 

## 3. Tensorflow 테스트

설치가 완료되면 아래 코드를 실행해보자.

### CPU only 버전

```py
>>> import tensorflow as tf
>>> sess = tf.Session()
>>> a = tf.constant(3)
>>> b = tf.constant(2)
>>> sess.run(a+b)
5
>>> sess.run(tf.constant('hello world'))
b'hello world'
```

### GPU 버전

GPU버전은 CPU only 버전에서의 `import tensorflow as tf` 부분이 실행될 때 CUDA library의 loading 여부 메시지가 출력된다. 모든 모듈을 성공적으로 불러오면 tensorflow가 제대로 설치된 것이다. 또한, Session을 실행할 때 GPU를 제대로 인식하는지 확인하자.

```py
>>> import tensorflow as tf
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\stream_executor\dso_loader.cc:128] successfully opened CUDA library cublas64_80.dll locally
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\stream_executor\dso_loader.cc:128] successfully opened CUDA library cudnn64_5.dll locally
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\stream_executor\dso_loader.cc:128] successfully opened CUDA library cufft64_80.dll locally
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\stream_executor\dso_loader.cc:128] successfully opened CUDA library nvcuda.dll locally
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\stream_executor\dso_loader.cc:128] successfully opened CUDA library curand64_80.dll locally
```

```py
>>> sess = tf.Session()
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\core\common_runtime\gpu\gpu_device.cc:885] Found device 0 with properties:
name: GeForce GTX 550 Ti
major: 2 minor: 1 memoryClockRate (GHz) 1.8
pciBusID 0000:01:00.0
Total memory: 1.00GiB
Free memory: 816.21MiB
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\core\common_runtime\gpu\gpu_device.cc:906] DMA: 0
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\core\common_runtime\gpu\gpu_device.cc:916] 0:   Y
I c:\tf_jenkins\home\workspace\release-win\device\gpu\os\windows\tensorflow\core\common_runtime\gpu\gpu_device.cc:948] Ignoring visible gpu device (device: 0, name: GeForce GTX 550 Ti, pci bus id: 0000:01:00.0) with Cuda compute capability 2.1. The minimum required Cuda capability is 3.0.
```

테스트 환경의 GPU는 GTX 550 Ti인데, Cuda compute capability가 2.1이기에 gpu 장치를 무시한다고 안내가 뜬다. 설마 했지만 역시나...
