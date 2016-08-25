---
title: Setting a remote ipython notebook server in Windows 10
layout: post
tags: ['ipython','remote','windows']
---

Anaconda가 설치된 x64 Windows 10 환경에서 진행하였다. Jupyter 공식문서 [http://jupyter-notebook.readthedocs.org/en/latest/public_server.html](http://jupyter-notebook.readthedocs.org/en/latest/public_server.html)를 참고하였다.

## 1. cmd에서 아래 명령어를 실행하여 설정파일 생성

{% highlight bash %}
$ jupyter notebook --generate-config
{% endhighlight %}

`jupyter_notebook_config.py`이 생성되었다는 메시지가 뜨면 ok.

## 2. 원격접속 ip, port 및 비밀번호 설정

생성된 config 파일의 내용을 수정한다. comment가 되어있는 부분을 찾아 uncomment하고 원하는 내용을 반영한다.

### 2-1. password 설정하지 않는 경우

{% highlight python %}
# Set ip to '*' to bind on all interfaces (ips) for the public server
c.NotebookApp.ip = '*' #본인 ip주소 입력
c.NotebookApp.password = u''
c.NotebookApp.open_browser = False

# It is a good idea to set a known, fixed port for server access
c.NotebookApp.port = 9999 #원하는 포트번호를 입력
{% endhighlight%}

### 2-2. password 설정하는 경우

보안을 위해 hashed password를 사용하는 것이 좋다. (다만, 본인 컴퓨터에서 실행 시에도 password를 입력해야 하는 번거로움이...) Python에서 `notebook.auth.security.passwd()` 함수를 사용하여 얻을 수 있다.

{% highlight python %}
In [1]: from notebook.auth import passwd
In [2]: passwd()
Enter password:
Verify password:
Out[2]: 'sha1:67c9e60bb8b6:9ffede0825894254b2e042ea597d771089e11aed'
{% endhighlight %}

설정 파일에 hashed password를 반영하여 저장한다.

{% highlight python %}
# Set ip to '*' to bind on all interfaces (ips) for the public server
c.NotebookApp.ip = '*' #본인 ip주소 입력
c.NotebookApp.password = u'sha1:bcd259ccf...<your hashed password here>'
c.NotebookApp.open_browser = False

# It is a good idea to set a known, fixed port for server access
c.NotebookApp.port = 9999 #원하는 포트번호를 입력
{% endhighlight%}

## 3. 위 설정파일에 반영된 포트 열기

단축키 `win+R`로 '실행' 창을 열어 `WF.msc`를 입력, '고급 보안이 포함된 Windows 방화벽'을 실행한다. 
왼쪽 tab에서 `인바운드 규칙` 클릭, 오른쪽 작업 tab에서 `새 규칙` 클릭하면 `인바운드 규칙 마법사`가 실행된다.
스텝 별로 선택해야 할 사항은 아래와 같다.

1. `포트` 선택
2. `TCP` 선택, 특정 로컬포트에 위 설정파일에 반영한 포트번호 입력
3. `연결 허용` 선택
4. `도메인`,`개인`,`공용` 모두 선택
5. 이름에 `원격 jupyter notebook 접속` 입력 (맘대로 설정 가능)

## 4. jupyter notebook 실행 및 다른 컴퓨터에서 접속이 되는지 확인

`jupyter notebook` (혹은 `ipython notebook`) 실행 후 다른 컴퓨터 브라우저에서 `http://ip:port`이 접속되는지 확인한다.

## 5. (옵션) 부팅 시 자동으로 jupyter notebook 자동시작

[http://freeprog.tistory.com/3](http://freeprog.tistory.com/3)를 참고하였다.
아래 내용의 `ipythonnote.bat` 파일을 관리자 권한이 없는 아무 폴더에 저장한다. 주의할 점은, 저장 파일의 인코딩이 `utf-8 without BOM`이어야 한다는 것이다. 윈도우 기본 내장 프로그램인 notepad(메모장)을 사용하지 말고 Sublime text나 Notepad++와 같은 편집기를 이용하길 바란다.

{% highlight text %}
c:
cd C:\Users\user\          # 폴더명은 상황에 따라... 변경하세요
ipython notebook
{% endhighlight%}

앞에서 저장한 파일을 `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`에 복사한다. 관리자 권한 때문에 시작프로그램 폴더에 직접 저장할 수가 없다.

재부팅 후 되는지 확인! 얏호!