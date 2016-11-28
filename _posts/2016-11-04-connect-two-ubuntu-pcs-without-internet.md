---
title: "인터넷 없이 우분투 PC끼리 직접 연결하기: 파일서버 및 Git서버 설정 (1)" 
layout: post
tags: ['samba','ubuntu','git','nas']
---

현재 진행하고 있는 프로젝트에서 두 대의 우분투 PC를 도입하여 개발환경 설정 중이다. 텐서플로(tensorflow)를 사용하여 딥러닝 모델을 개발할 예정이므로 당연히 코드 버전 관리 (code version control)가 필요한 상황이나, 두 컴퓨터는 보안정책 상 인터넷에 연결할 수 없다. 사정을 간곡히 설명한 끝에 두 컴퓨터끼리만이라도 연결할 수 있도록 크로스케이블을 제공받을 수 있었다.

크로스케이블을 사용하여 두 컴퓨터의 랜 포트를 서로 연결한 뒤, samba를 사용하여 파일서버(NAS)를 구축하고, git 서버계정을 만들어 설정하였다. 이에 따라 두 컴퓨터 간 파일을 GUI 환경에서 공유할 수 있는 통로가 생겼으며, 같은 저장소의 코드를 복제(clone)하여 각자의 수정사항을 서버에 반영할 수 있게 되었다.

이렇게 얘기하면 매우 쉬워보이지만, 6시간의 삽질을 하였다. 여러 삽질 중 가장 깔끔하고 명쾌한 방법을 선택하였으며, 나중에 똑같은 삽질 하기 싫어서 정리해두기로 했다. 참고로, 두 컴퓨터에는 Ubuntu 16.04를 설치한 상태(서버 버전 아님)이며, 1번 컴퓨터가 서버가 될 예정이다.


## 1. 두 컴퓨터 연결하기

먼저 크로스케이블을 준비한다. 크로스케이블은 컴퓨터-컴퓨터 (homogeneous) 연결에 사용된다. (허브를 통해 연결하려면 다이렉트 케이블이 필요하다. 여기서는 다루지 않겠다.) 만약 크로스케이블이 없거나, 일반적으로 사용하는 랜선밖에 없는가? 최신 메인보드나 랜카드는 크로스케이블이 아닌 다이렉트케이블을 연결해도 알아서 크로스로 신호를 바꿔준다고도 한다 (하지만 장담 못한다). 일단 연결해보자.


## 2. IP 설정 및 연결여부 확인

두 컴퓨터를 연결했다면 서로 인식할 수 있도록 주소가 있어야 한다. 다시 말해, 각 컴퓨터에 IP주소, netmask를 설정해주어야 한다. 우상단에 있는 네트워크 연결 아이콘에서 오른쪽 마우스 버튼을 클릭하여 'edit connections'에 들어간다. 새로 'ethernet' 연결을 추가하면 설정창이 하나 뜬다. 케이블을 연결한 포트에 맞는 맥어드레스(mac address)를 선택해준다. 그 뒤, 'ipv4 settings' 탭에서 IP주소와 netmask를 입력한다. (IP주소는 원하는 대로 정해도 상관없다.)

{% highlight bash %}
# example for computer one would be  
address  | netmask       | gateway   
10.0.0.1 | 255.255.255.0 |  
# example for computer two would be  
10.0.0.2 | 255.255.255.0 |
{% endhighlight %}

IP와 netmask 설정을 다 마친 뒤, 서로 연결되었는지 확인해본다. 터미널에서 아래와 같이 명령어를 입력하면, 1번 컴퓨터에서 2번 컴퓨터로 접속이 되는지 확인할 수 있다.

{% highlight bash %}
$ ping 10.0.0.2
PING 10.0.0.2 (10.0.0.2) 56(84) bytes of data.
64 bytes from 10.0.0.2: icmp_seq=1 ttl=128 time=0.457 ms
...
{% endhighlight %}


이제 두 컴퓨터는 서로 파일이나 데이터를 주고받을 수 있도록 연결되었다!

파일서버 및 Git 서버 설정은 다음 포스트에 정리해야겠다.

### References
- [http://askubuntu.com/questions/22835/how-to-network-two-ubuntu-computers-using-ethernet-without-a-router](http://askubuntu.com/questions/22835/how-to-network-two-ubuntu-computers-using-ethernet-without-a-router)
