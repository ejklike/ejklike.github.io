---
title: "Nvidia gpu + ubuntu + cuda = ERROR일 때 해결방법"
layout: post
description: ""
tags: ['cuda','ubuntu','theano','nvidia','gpu','nomodeset','nouveau','opengl']
---

x64 데스크탑에 nvidia GTX 970을 장착한 뒤, 우분투 14.04.3(또는 15.10)을 설치하는데 장기간의 삽질을 하였다.
또한, cuda 설치 후 anaconda 기반의 theano 환경을 구축하는데도 애를 먹었다.

아래는 문제상황 및 해결방법. 비슷한 상황을 겪는 사람에게 도움이 되면 좋겠다.


## 1. 우분투 14.04.3(또는 15.10)이 설치되어 있는 상황에서 cuda 설치 후 재부팅 시 로그인 화면 무한반복. (+low resolution은 덤)

Nvidia cuda 설치 시 OpenGL이나 nouveau와 충돌하여 오류가 생기는 것. 일단 상콤하게 우분투 재설치 후 3번으로 이동. 혹시 우분투 재설치 중 검정색 빈 화면이 나오면 2번으로 이동.


## 2. 우분투 설치를 위해 usb로 부팅 시 검정색 빈 화면. 설치하고 싶어도 설치를 못하는 상황.

문제상황의 흐름을 좀 더 자세히 서술하면,

1. Ubuntu installer usb로 부팅
2. 'Try Ubuntu without installing'이나 'Install Ubuntu' 중 1개 택일
3. 검정색 빈 화면

이는 ubuntu와 hardware configuration의 충돌(특히, gpu)때문이다. 이를 해결하기 위해서는 nomodeset 옵션이 필요하다. 설명은 [http://ubuntuforums.org/showthread.php?t=1613132](http://ubuntuforums.org/showthread.php?t=1613132)를 참고. "nouveau" 드라이버를 default로 사용하는 nvidia gpu에서 문제가 생긴다고 하는데, 실제로 cuda 설치 시에도 nouveau 비활성화를 했더니 오류 없이 설치할 수 있었다(3번 참고).

해결방법: 

1. Ubuntu installer usb로 부팅하여 `Try Ubuntu without installing`, `Install Ubuntu` 등을 선택할 수 있는 화면이 나타남을 확인한다.
2. `e`를 누른 뒤 나타나는 텍스트 편집창에서 `quiet splash`라는 문구가 등장하는 라인(나의 경우, 아래에서 두 번쨰 라인이었음)의 맨 끝에 `nomodeset`을 입력한다.
3. `F10`을 눌러 재부팅하면 검정색 빈 화면이 뜨지 않고 ubuntu 로고와 함께 정상적인 설치화면이 나타남을 확인할 수 있다.

설치 후, 최초 부팅 시에도 nomodeset을 적용하여 부팅해야 ubuntu 로고와 함께 정상적인 로그인 화면이 등장한다. 매번 부팅할 때마다 자동으로 적용될 수 있도록 하려면 다음을 따라한다.

1. Terminal에서 `gksudo gedit /etc/default/grub` 입력
2. 파일 내용 중 `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"` 찾기
3. `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nomodeset"` 으로 수정 후 저장

재부팅하여 자동 적용되는지, 즉, 정상적으로 부팅이 잘 되는지 확인한다. 만약 여기서 cuda를 설치하고 싶다면 3번으로 이동.


## 3. 우분투 설치 후 cuda + anaconda 기반 theano 작업환경 만들기

수많은 documentation이 있었지만, [http://spturtle.blogspot.kr/2015/07/cuda70-and-theano-setup-in-ubuntu-linux.html](http://spturtle.blogspot.kr/2015/07/cuda70-and-theano-setup-in-ubuntu-linux.html)을 참고하였다. 해당 문서에서는 ubuntu 제공 python을 사용하였으나, 나는 numpy, scipy, theano 등 데이터 분석에 필요한 웬만한 패키지가 모두 내장되어있는 [Anaconda](https://www.continuum.io/downloads)를 사용하기로 하였다. Anaconda 기반의 theano 작업환경을 구축하고 싶다면 아래와 같은 과정을 따라하면 되겠다.

1. Cuda 설치: 위 블로그의 2~9 따라하기. 
	* 내부 충돌을 야기할 만한 모든 요소를 비활성화한 뒤 설치하므로 복잡하게 느껴질 수 있지만 찬찬히 따라가면 어렵지 않다.
	* 3가지 핵심: Disable Nouveau driver, Stop X server, Don't install OpenGL
2. Cuda 정상설치여부 확인: 위 블로그 10번 따라하기.
	* Terminal에서 `nvcc -V`, `nvidia-smi` 확인으로도 충분
3. Anaconda 설치: [Anaconda](https://www.continuum.io/downloads) 참고.
4. Theano configuration: 위 블로그의 13 따라하기.
5. Theano에서 gpu를 사용하는지 확인: 위 블로그의 14 따라하기.

'using the gpu'라고 뜨면 성공! 얏호!









