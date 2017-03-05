---
title: "우분투 16.04에 텐서플로 1.0 설치하기 (1) Nvidia 소프트웨어 설치 (feat. GTX 970)"
layout: post
tags: ['install', 'ubuntu', 'tensorflow', 'nvidia', 'gpu']
---

이 글은 ubuntu 16.04 운영체제에 Nvidia GPU와 tensorflow 기반의 딥러닝 환경을 구축하고자 하는 사람들을 위해 작성되었다. 필자는 주로 파이썬으로 데이터를 다루기 때문에 [최신 Anaconda 파이썬 3.6 버전](https://www.continuum.io/downloads)을 사용할 것이며 텐서플로를 별도의 가상환경에 분리하지 않을 것이다.

순정 우분투 16.04.2 설치를 마친 직후라 가정하고 서술하겠다. 만약 설치하려는데 검정색 빈화면만 나와 애를 먹고 있다면 [이전 포스트]({{ BASE_PATH }}{{ page.previous.url }})를 참고하자.

[텐서플로 공식 홈페이지](https://www.tensorflow.org/install/install_linux#nvidia_requirements_to_run_tensorflow_with_gpu_support)에 소개된 바에 따르면 우분투에서 Nvidia 그래픽카드를 사용하기 위해서는 아래 나열된 Nvidia 관련 소프트웨어를 설치해야 한다. (`pip install tensorflow`만 하면 끝일 줄 알았다면 순진한거다! 사실 막연하게 그랬으면 좋겠다고 생각했다..) 

- CUDA® Toolkit 8.0
- CUDA 8.0과 호환되는 Nvidia 그래픽 드라이버
- CuDNN v5.1

> tensorflow가 본인의 GPU를 지원하지 않는다면 텐서플로 GPU버전을 깔아도 GPU를 사용하지 않는다. 자세한 내용은 [이 글]({{ site.baseurl }}{% link _posts/2016-12-27-install-tensorflow-on-windows-10.md %})을 참고하자.

# 1. Nvidia 그래픽 드라이버 설치

우분투 설치를 마친 직후 부팅해보면 운영체제에서 그래픽카드를 아직 인식하지 못한 상태이기 때문에 해상도가 매우 낮을 수 있다. 이 때, 그래픽 드라이버를 설치하면 고해상도가 된다.

NVIDIA 그래픽 드라이버를 배포하는 PPA를 설치하고 업데이트를 한다.

```terminal
$ sudo add-apt-repository ppa:graphics-drivers/ppa
$ sudo apt-get update
```

Preferences 실행 -> Software & update 선택 ->  Additional drivers 선택 -> NVIDIA Corporation 그래픽 드라이버 목록 중 [367.4x 버전 이상](http://stackoverflow.com/questions/30820513/what-is-version-of-cuda-for-nvidia-304-125/30820690)의 최신 버전을 선택하여 설치한다 (나는 375.26 버전으로 설치했는데, 꽤 오래 기다려야 했다). 

설치가 끝나면 재부팅한다.

```terminal
$ sudo reboot
```

재부팅 후 고해상도 화면이 나오면 성공이라고 생각하면 된다. 터미널에 `nvidia-smi`를 입력하면 아래와 같이 드라이버 버전과 시스템에 인식된 GPU를 확인할 수 있다.

```terminal
$ nvidia-smi
Mon Mar  6 01:01:51 2017
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 375.39                 Driver Version: 375.39                    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 970     Off  | 0000:05:00.0      On |                  N/A |
|  0%   29C    P8    12W / 180W |    292MiB /  4034MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID  Type  Process name                               Usage      |
|=============================================================================|
|    0      1128    G   /usr/lib/xorg/Xorg                             169MiB |
|    0      1887    G   compiz                                         121MiB |
+-----------------------------------------------------------------------------+
```

> 만약 그래픽 드라이버 설치 도중 바이오스 화면이 뜨거나, 설치를 완료하고 부팅했는데 무한 로그인 loop에 빠진다면 바이오스 설정에서 `secure boot` 옵션을 `disabled` 상태로 바꾸자. 몇 달 전 이 문제 때문에 몇 시간동안 고생했었다..


# 2. CUDA Toolkit 8.0 설치

[공식 다운로드 페이지](https://developer.nvidia.com/cuda-downloads)에서 우분투 16.04의 runfile(local)을 다운로드한다. 모두 받았다면 아래와 같이 실행한다.

```terminal
$ sudo sh cuda_8.0.61_375.26_linux.run
```

장문의 라이센스 문구가 나오는데, `Enter`를 입력하며 넘기기 귀찮다면 `Ctrl`+`C`를 입력하자. 한 번에 아래 질문으로 넘어간다. 이후의 질문에 아래와 같이 답하자.

```terminal
Do you accept the previously read EULA?
accept/decline/quit: accept

Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 375.26?
(y)es/(n)o/(q)uit: n

Install the CUDA 8.0 Toolkit?  
(y)es/(n)o/(q)uit: y

Enter Toolkit Location  
 [ default is /usr/local/cuda-8.0 ]: 

Do you want to install a symbolic link at /usr/local/cuda?  
(y)es/(n)o/(q)uit: y

Install the CUDA 8.0 Samples?  
(y)es/(n)o/(q)uit: n

Enter CUDA Samples Location  
 [ default is /home/your_id ]: 
```

설치를 마친 뒤 환경변수 설정을 한다. 터미널에 아래와 같이 입력하자.

```terminal
$ echo -e "\n## CUDA and cuDNN paths"  >> ~/.bashrc
$ echo 'export PATH=/usr/local/cuda-8.0/bin:${PATH}' >> ~/.bashrc
$ echo 'export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib64:${LD_LIBRARY_PATH}' >> ~/.bashrc
```

위와 같이 실행하면 `~/.bashrc`에 마지막 부분에 아래 내용이 추가된다.

```bash
## CUDA and cuDNN paths 
export PATH = /usr/local/cuda-8.0/bin : $ { PATH } 
export LD_LIBRARY_PATH = /usr/local/cuda-8.0/lib64 : $ { LD_LIBRARY_PATH }
```

변경된 환경변수를 적용하고 cuda 설치여부를 확인하자.

```terminal
$ source ~/.bashrc
$ nvcc --version
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2016 NVIDIA Corporation
Built on Tue_Jan_10_13:22:03_CST_2017
Cuda compilation tools, release 8.0, V8.0.61
```

다음 단계로 넘어가기 전에 cuda가 어느 위치에 설치되어 있는지 확인하고 넘어가자. CuDNN 파일을 붙여넣을 경로를 보여주므로 중요하다. 기본으로 `/usr/local/cuda/`인 경우가 많은데, 나의 경우는 `/usr/local/cuda-8.0/`이다.

```terminal
$ which nvcc
/usr/local/cuda-8.0/bin/nvcc
```


# 3. CuDNN v5.1 설치

[공식 다운로드 페이지](https://developer.nvidia.com/rdp/cudnn-download)에서 CuDNN을 다운로드 받는다 (회원가입이 필요하다). 여러 파일 목록 중 cuDNN v5.1 Library for Linux(파일명: `cudnn-8.0-linux-x64-v5.1.tgz`)를 받자.

아래와 같이 압축을 풀고 그 안의 파일을 cuda 폴더(주의: `which nvcc` 출력값 확인)에 붙여넣고 권한설정을 한다. `which nvcc` 실행 결과 cuda 폴더가 `/usr/local/cuda-8.0`이 아니라 `/usr/local/cuda`일 수도 있으니 꼼꼼히 확인하자.

```terminal
$ tar xzvf cudnn-8.0-linux-x64-v5.1.tgz
$ which nvcc
/usr/local/cuda-8.0/bin/nvcc
$ sudo cp cuda/lib64/* /usr/local/cuda-8.0/lib64/
$ sudo cp cuda/include/* /usr/local/cuda-8.0/include/
$ sudo chmod a+r /usr/local/cuda-8.0/lib64/libcudnn*
$ sudo chmod a+r /usr/local/cuda-8.0/include/cudnn.h
```

아래와 같은 명령어를 입력하여 비슷한 출력값이 나오면 설치 성공이다.

```terminal
$ cat /usr/local/cuda/include/cudnn.h | grep CUDNN_MAJOR -A 2  
#define CUDNN_MAJOR      5
#define CUDNN_MINOR      1
#define CUDNN_PATCHLEVEL 10
--
#define CUDNN_VERSION    (CUDNN_MAJOR * 1000 + CUDNN_MINOR * 100 + CUDNN_PATCHLEVEL)

#include "driver_types.h"
```

# 4. NVIDIA CUDA Profiler Tools Interface 설치

NVIDIA CUDA Profiler Tools Interface를 터미널에 아래와 같이 입력하여 설치한다. 이전에 보지 못했던 패키지인데 [공식 문서](https://www.tensorflow.org/install/install_linux#nvidia_requirements_to_run_tensorflow_with_gpu_support)에서 필요하다고 하니 설치하자.

```terminal
sudo apt-get install libcupti-dev
```

[다음 포스트]({{ BASE_PATH }}{{ page.next.url }})에서는 Anaconda 파이썬 3.6과 Bazel을 설치한다.

#### References

- <http://qiita.com/JeJeNeNo/items/05e148a325192004e2cd>
- <http://stackoverflow.com/questions/31326015/how-to-verify-cudnn-installation>