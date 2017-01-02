---
title: "인터넷 없이 우분투 PC끼리 직접 연결하기: 파일서버 및 Git서버 설정 (2)" 
layout: post
tags: ['samba','ubuntu','git','nas']
---

[이전 포스트 (1)]({{ BASE_PATH }}{{ page.previous.url }})에서 두 컴퓨터를 연결하고 테스트까지 수행하였다. 이제 1번 컴퓨터를 파일서버로 만들어 2번 컴퓨터에서 접속할 수 있도록 하자.

## Samba를 이용한 파일서버 설정

파일 서버 설치를 위해서는 samba라는 패키지가 필요하다. samba 설치 후 접속할 사용자 계정을 추가하고 패스워드나 권한 등을 수정하면 된다. 간단하다! 1번 컴퓨터가 서버이니, 1번 컴퓨터에 아래와 같이 서버를 설정해보자.

### 1) samba 설치

```terminal
$ sudo apt-get install samba
```

### 2) 공유폴더에 접속할 사용자 추가

```terminal
$ sudo adduser user1 #user 이름은 원하는 대로
```

### 3) samba 접속 가능 사용자 등록, 공유폴더 접속 패스워드 설정

```terminal
$ sudo smbpasswd -a user1
```

참고로, 사용자 삭제는 `sudo smbpasswd -x user1`이다.

### 4) 공유 폴더 설정: 폴더 위치, 유저, 권한 등

'smb.conf'라는 samba 설정파일을 에디터로 연다.

```terminal
$ sudo nano /etc/samba/smb.conf #nano 대신 gedit, vi 등 원하는 에디터 사용 가능
```

아래 내용을 추가한다.

```markdown
#user1에게 공유할 폴더 위치 및 권한 설정
[user1_home]
    comment= shared folder (local) #공유 폴더 설명
    path = /home/asdf/share #공유할 폴더 위치 (당연히, 폴더가 존재해야 함)
    read only = no #읽기 권한만 부여할 지 여부
    writable = yes #읽기/쓰기 권한 부여할 지 여부
    browseabale = yes # 해당 폴더를 윈도우 '내 네트워크 환경' 목록에 노출시킬 지 여부
    guest ok = no # 누구나 접근 가능 여부
    valid users = user1 #접속 가능 유저

# global setting에 아래 두 내용 추가
[global]
create mask = 0644  #새로 생성한 파일에 대한 권한 설정
directory mask = 0755 #새로 생성한 폴더에 대한 권한 설정
```

### 5) samba 서버 재시작

```terminal
$ sudo /etc/init.d/samba reload
```

### 6) 접속이 되는지 확인

2번 컴퓨터에서 1번 컴퓨에 접속해보자. File manager에서 'file'-'connect to server'를 차례로 클릭하면 새 창이 뜬다. `smb://10.0.0.1`을 입력하고 엔터를 치면 서버폴더가 나타날 것이다. 위에서 공유한 폴더(위 설정에 따르면 `share` 폴더)를 더블클릭하여 samba 계정 `user1`으로 접속해보자. 끝.


파일서버를 설정했으니, 이제 두 컴퓨터끼리 공유폴더를 통해 파일을 주고받을 수 있게 되었다. 다음 포스트에서는 Git 서버 설정 방법을 정리할 예정이다.



### References
- [http://soooprmx.com/wp/archives/1326](http://soooprmx.com/wp/archives/1326)
- [http://funnylog.kr/434](http://funnylog.kr/434)