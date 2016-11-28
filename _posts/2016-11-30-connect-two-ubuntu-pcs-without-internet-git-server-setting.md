---
title: "인터넷 없이 우분투 PC끼리 직접 연결하기: 파일서버 및 Git서버 설정 (3)" 
layout: post
tags: ['samba','ubuntu','git','nas']
---


[지난 포스트 (1)]({{ BASE_PATH }}{{ page.previous.previous.url }})에서 두 컴퓨터를 연결하고 테스트까지 수행하였다. 여기서는 Git 서버를 설정하는 방법을 다룬다. 만약 파일서버 설정하고 싶으면 [지난 포스트 (2)]({{ BASE_PATH }}{{ page.previous.previous.url }})를 참고해보자.


## Git 서버 환경 구성

Svn을 쓸까 git을 쓸까 고민하다가 git을 추천하는 이가 많아 git을 사용하기로 하였다. 1번 컴퓨터에 git 서버 계정 `git`을 만들어 서버 저장소(repository)를 1번 컴퓨터에서도, 2번 컴퓨터에서도 local로 가져와서 작업할 수 있도록 하였다.

1번 컴퓨터에서 아래 순서에 따라 작업을 진행하자.

### 1) git 패키지 설치

{% highlight bash %}
$ sudo apt-get install git-core
{% endhighlight %}

> 참고: 'git-core'와 'git'의 차이는 [여기](http://askubuntu.com/questions/5930/what-are-the-differences-between-the-git-and-git-core-packages)에 설명되어 있다.

### 2) git 서버용 우분투 계정 `git` 생성, 패스워드 설정

{% highlight bash %}
$ sudo adduser --system --shell /bin/bash --gecos 'git version control' --group --home /home/git git
$ passwd git
{% endhighlight %}

### 3) git 정보가 저장될 저장소 폴더 생성

{% highlight bash %}
$ sudo -u git mkdir /home/git/repositories
{% endhighlight %}

### 4) 서버에 저장할 프로젝트를 로컬에 생성

{% highlight bash %}
$ cd
$ mkdir Project
$ cd Project
$ touch README
$ git init
$ git add .
$ git status
$ git commit -a -m "Project First Commit"
{% endhighlight %}

### 5) 로컬에 생성한 저장소를 공개저장소로 바꾸기

{% highlight bash %}
$ pwd #현재 폴더위치 확인
~/Project #현재 폴더위치가 로컬저장소가 아니면 이동할 것
$ cd ..
$ ls
Project
$ git clone --bare Project Project.git
$ touch Project.git/git-daemon-export-ok
{% endhighlight %}




{% highlight bash %}

{% endhighlight %}


{% highlight bash %}
$ git clone git@localhost:/home/git/reporitories/project.git #1번 컴퓨터에서
$ git clone git@10.0.0.1:/home/git/reporitories/project.git #2번 컴퓨터에서
{% endhighlight %}

만약 git 계정 등록을 해놓지 않았다면, 아래와 같이 유저 이름과 이메일을 설정해줘야 한다. (임의로 설정해도 된다.)

{% highlight bash %}
$ git config --global user.name "ejklike"
$ git config --global user.email ejklike@gmail.com
{% endhighlight %}


간단하게 git 서버 설정을 살펴보았다. 만약 git 저장소에 접속할 유저가 매우 많아지면 `gitolite`를 사용하는 방법이 가장 많이 쓰이는 것으로 알고 있다. 또한, ssh를 사용하면 git 계정에 접속할 때 패스워드를 입력하지 않도록 설정할 수도 있다. 이는 각자 알아서 하자. (귀찮...)


### References
- [http://khmirage.tistory.com/309](http://khmirage.tistory.com/309)
- [https://www.linux.com/learn/how-run-your-own-git-server](https://www.linux.com/learn/how-run-your-own-git-server)















aa
