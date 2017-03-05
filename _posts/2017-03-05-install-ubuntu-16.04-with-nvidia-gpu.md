---
title: "우분투 설치 usb로 부팅하면 검정색 빈 화면만 보이는 문제 해결방법"
layout: post
tags: ['ubuntu','nvidia','gpu','nomodeset']
---

x64 데스크탑에 nvidia GTX 970을 장착한 뒤, 우분투 14.04.3 LTS에서 15.10, 16.04.2 LTS까지 장기간의 삽질을 했다. 별 문제 없이 설치한 사람들도 있겠지만 난 정말 다양한 문제를 경험했다. 대부분 그래픽카드 문제였다. 

그 중 포스트 제목과 같은 검정색 빈 화면 문제는 GTX 970을 사용하는 사람들에게 여럿 발생하는 것을 확인했다. 아래에 문제상황과 해결법을 자세히 적어두었으니 비슷한 상황을 겪는 사람에게 도움이 되면 좋겠다.

## 우분투 설치를 위해 usb로 부팅했는데 검정색 빈 화면이 뜬다. 설치하고 싶어도 설치를 못하는 안습인 상황...어쩌지?

문제상황의 흐름을 좀 더 자세히 서술하면,

1. Ubuntu installer usb로 부팅
2. 'Try Ubuntu without installing'이나 'Install Ubuntu' 중 1개 택일
3. 검정색 빈 화면

이는 ubuntu와 hardware configuration의 충돌(특히, gpu)때문이다. 이를 해결하기 위해서는 nomodeset 옵션이 필요하다. 설명은 [http://ubuntuforums.org/showthread.php?t=1613132](http://ubuntuforums.org/showthread.php?t=1613132)를 참고하자. `nouveau` 드라이버를 default로 사용하는 nvidia gpu에서 문제가 생긴다고 한다.

해결방법: 

1. Ubuntu installer usb로 부팅하여 `Try Ubuntu without installing`, `Install Ubuntu` 등을 선택할 수 있는 화면이 나타남을 확인한다.
2. `e`를 누른 뒤 나타나는 텍스트 편집창에서 `quiet splash`라는 문구가 등장하는 라인(나의 경우, 아래에서 두 번쨰 라인이었음)의 맨 끝에 `nomodeset`을 입력한다. (혹시 맨 끝에 `quiet splash ---`라고 되어있다면 `quiet splash nomodeset`으로 수정)
3. `F10`을 눌러 재부팅하면 검정색 빈 화면이 뜨지 않고 ubuntu 로고와 함께 정상적인 설치화면이 나타남을 확인할 수 있다.

설치 후, 최초 부팅 시에도 nomodeset을 적용하여 부팅해야 ubuntu 로고와 함께 정상적인 로그인 화면이 등장한다. 매번 부팅할 때마다 자동으로 적용될 수 있도록 하려면 다음을 따라한다.

1. Terminal에서 `gksudo gedit /etc/default/grub` 입력
2. 파일 내용 중 `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"` 찾기
3. `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash nomodeset"` 으로 수정 후 저장

재부팅하여 자동 적용되는지, 즉, 정상적으로 부팅이 잘 되는지 확인한다. 

> #### 우분투 설치 전에 바이오스 설정부터 하자. Fast Boot, Secure Boot 모두 비활성화 할 것!
>
> Fast boot가 활성화돼있으면 usb가 인식되지 않을 수 있고, Secure Boot가 활성화돼있으면 Nvidia 그래픽 드라이버 설치 후 ***무한 재부팅 loop***에 빠질 수도 있다.. 이것 때문에 얼마나 고생했던가 ㅠㅠ


<!--## 한/영 전환을 별도로 설정하기 귀찮은 자들을 위한 꼼수

16.04 기준이다. 그 이하 버전에서는 안될 가능성이 높다.

1. 설치할 때 운영체제 언어로 '한국어'를 선택한다. (키보드는 영어여도 상관없음.)
2. 우분투 운영체제 설치를 끝마치고 로그인하면 언어 업데이트 메시지창이 뜨는데, 차례로 따라가면서 업데이트 한다.
3. 브라우저든 검색창이든 입력창에서 한영키 테스트를 해보자. 와우!
4. (옵션) 이렇게 하면 폴더명이 모두 한글이 되어 터미널 환경에서 불편할 수 있다. 아래의 명령어 두 줄이면 영어로 바꿀 수 있다.

```bash
$ export LANG=C
$ xdg-user-dirs-gtk-update
```-->
