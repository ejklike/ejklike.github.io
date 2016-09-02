---
title: Markdown and Visual Studio Code (VS code)
layout: post
tags: ['markdown', 'VScode']
---

코드 작업을 위한 에디터로 가볍다고 소문난 [Sublime Text 2](http://www.sublimetext.com/2)를 사용했었는데, [Visual Studio Code (VS Code)](https://code.visualstudio.com/b?utm_expid=101350005-27.GqBWbOBuSRqlazQC_nNSRg.1&utm_referrer=https%3A%2F%2Fcode.visualstudio.com%2Fdocs%2Fsetup%2Fwindows) 또한 가볍고 "안정적"이라는 호평이 많아 사용해보기로 했다. 기존에 Sublime Text에 설치한 패키지 문제로 사소한 버그를 여럿 겪었었기에 안정적이라는 단어에 마음이 동했다. 아직 많이 사용해본건 아니지만, 몇 가지 장점이 있어 계속 사용할 마음을 굳혔다. 생각나는대로 장점을 적어보자면, 

- 다양한 개발 언어와 그들의 code completion 기능 지원
  - Python, Java, C++, HTML, Markdown, Ruby, ...
  - 윈도우에서 C++ 작업을 할 때 그 무거운 Visual Studio를 더 이상 설치할 필요가 없다면? 얏호! (하지만 아직 안해봤다는거...)
- 폴더 단위로 작업환경 (언어, 컴파일 등) 커스터마이징 가능
  - 작업환경 설정이 귀찮다면, 단점이 될수도?
- VS code 상에서 terminal 실행 가능 (단축키: ``ctrl+` ``)
- command line에서 `code .` 입력하면 현재 폴더에서 VS code가 실행됨
  - 윈도우 폴더 빈 공간에서 오른쪽 마우스 클릭 후 'Open with code' 선택해도 같음
- json 파일 기반의 workspace setting, default setting 중 수정하고 싶은 부분만 settings.json에 명시하여 overwrite
  - Sublime Text도 json 기반이지만, default 세팅 파일을 백업해두고 수정을 해야하는 번거로움이 있음
- 간단한 Git 연동 인터페이스로 손쉬운 commit 가능 (메시지 입력 후 `ctrl+enter`)
  - 자세한 내용은 [여기](https://code.visualstudio.com/docs/editor/versioncontrol) 확인

[공식 문서](https://code.visualstudio.com/docs/languages/markdown)에 따르면 VS code는 markdown preview를 기본으로 제공하며 (단축키: `Ctrl+Shift+V`), css 파일로 preview style 변경이 가능하다. 기본 style은 VS code theme인데, [Visual Studio Code 에서 깃헙 스타일 마크다운 사용하기](http://blog.aliencube.org/ko/2016/07/06/markdown-in-visual-studio-code/)를 참고하여 맑은고딕 한글폰트가 반영된 github theme로 수정하였다. 그리고 markdown 작업에 도움이 될만한 extension을 설치하였다.

- Auto-Open Markdown Preview: markdown editor 오른편에 자동으로 preview 나타남 (매번 켤 필요가 사라짐)
- markdownlint: code style error 확인

결과 스크린샷은 아래와 같다. 왼편에 탐색기, 가운데 에디터, 오른편 프리뷰, 아래 터미널로 all-in-one 인터페이스!

![screenshot]({{base}}/assets/20160902/screenshot.png "markdwon with VS code")

참고로 editor style 개인설정은 아래와 같다. 폰트와 줄바꿈 정도만 수정했다.

{% highlight css %}
// 설정을 이 파일에 넣어서 기본 설정을 덮어씁니다.
{
    // 글꼴 패밀리를 제어합니다.
    "editor.fontFamily": "Inconsolata, 'D2Coding', 'Malgun Gothic', 'Noto Sans CJK KR', Consolas, 'Courier New', monospace",

    // 글꼴 크기를 제어합니다.
    "editor.fontSize": 13,

    // 편집기에서 몇 개의 문자 이후에 줄을 바꿀지를 제어합니다. 이 값을 0으로 설정하면 뷰포트 너비 줄 바꿈이 설정됩니다(자동 줄바꿈). -1로 설정하면 편집기에서 줄바꿈을 하지 않습니다.
    "editor.wrappingColumn": 100,

    // Markdown
    // A list of URLs or local paths to CSS style sheets to use from the markdown preview. Relative paths are interpreted relative to the folder open in the explorer. If there is no open folder, they are interpreted relative to the location of the markdown file. All '\' need to be written as '\\'.
    "markdown.styles": [
        "file:///C:\\Users\\dmlab\\AppData\\Roaming\\Code\\User\\style.css"
    ]
}
{% endhighlight %}
