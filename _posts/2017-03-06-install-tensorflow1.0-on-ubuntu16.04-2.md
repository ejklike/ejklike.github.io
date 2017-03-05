---
title: "우분투 16.04에 텐서플로 1.0 설치하기 (2) Anaconda, Bazel 설치"
layout: post
tags: ['install', 'ubuntu', 'tensorflow', 'nvidia', 'gpu']
---

[이전 포스트]({{ BASE_PATH }}{{ page.previous.url }})에서 Nvidia 관련 소프트웨어 설치까지 끝마쳤다. 이제 파이썬 3를 위한 Anaconda를 설치하고, tensorflow를 위한 Bazel을 설치하자.

# 1. Anaconda Python 3.6 설치

[공식 다운로드 페이지](https://www.continuum.io/downloads)에서 파이썬 3.6 버전의 64비트 인스톨러를 다운받은 뒤 아래의 명령어로 설치한다. 장문의 라이센스 소개가 나오면 `Enter`를 계속 입력해야 하는데, 귀찮다면 `Ctrl`+`C`를 입력하여 넘어가면 된다. 선택지가 나오면 모두 `yes`로 답한다.

```terminal
$ bash Anaconda3-4.3.0-Linux-x86_64.sh
```

설치가 완료되면 터미널에 아래와 같이 입력하여 업데이트된 환경변수 내용을 시스템에 적용한다.

```terminal
$ soucre ~/.bashrc
```

이제 파이썬을 실행하면 아래와 같이 뜬다.

```terminal
$ python
Python 3.6.0 |Anaconda 4.3.0 (64-bit)| (default, Dec 23 2016, 12:22:00) 
[GCC 4.4.7 20120313 (Red Hat 4.4.7-1)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

공식문서에서 텐서플로는 `python3-numpy python3-dev python3-pip python3-wheel`가 필요하다고 하는데, `dev` 이외의 나머지 패키지는 이미 Anaconda에 설치돼있다. `dev`는 아래와 같이 터미널에 입력하여 설치하자.

```terminal
$ pip install dev
```


# 2. Bazel 설치

[바젤 설치문서](https://bazel.build/versions/master/docs/install.html)를 참고하였다. 먼저 JDK 8을 설치한다.

```terminal
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer
```

아래와 같이 바젤 배포 URI를 추가한다.

```terminal
$ echo "deb [arch=amd64] http://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list
$ curl https://bazel.build/bazel-release.pub.gpg | sudo apt-key add -
```

URI를 추가했으니 업데이트 후 바젤을 설치하자.
```terminal
$ sudo apt-get update && sudo apt-get install bazel
$ sudo apt-get upgrade bazel # if you want newer version of Bazel
```

드디어 [다음 포스트]({{ BASE_PATH }}{{ page.next.url }})에서 텐서플로를 설치한다.