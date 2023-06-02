<script lang="ts">
    export let text = "Hello World!";
</script>

<div id="container">
    <div id="circle">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
    <defs>
        <path id="circlePath" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,a0 "/>
    </defs>
            <circle cx="150" cy="100" r="75" fill="none"/>
            <g>
        <use xlink:href="#circlePath" fill="none"/>
                <text fill="#000">
            <textPath xlink:href="#circlePath">{text}</textPath>
        </text>
    </g>
</svg>
    </div>
</div>


<style>
    #container { margin: 0%; }

    #circle { position: relative; width: 100%; padding-bottom: 100%; overflow: hidden; }

    #circle text { font-family: 'Helvetica Neue', Arial; font-size: 16px; font-weight: bold; }

    #circle svg { position: absolute; left: 0; top: 0; width: 100%; height: 540px;

        -webkit-animation-name: rotate;
        -moz-animation-name: rotate;
        -ms-animation-name: rotate;
        -o-animation-name: rotate;
        animation-name: rotate;
        -webkit-animation-duration: 5s;
        -moz-animation-duration: 5s;
        -ms-animation-duration: 5s;
        -o-animation-duration: 5s;
        animation-duration: 5s;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
        -o-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
        -ms-animation-timing-function: linear;
        -o-animation-timing-function: linear;
        animation-timing-function: linear;

    }

    @-webkit-keyframes rotate {
        from { -webkit-transform: rotate(360deg); }
        to { -webkit-transform: rotate(0); }
    }
    @-moz-keyframes rotate {
        from { -moz-transform: rotate(360deg); }
        to { -moz-transform: rotate(0); }
    }
    @-ms-keyframes rotate {
        from { -ms-transform: rotate(360deg); }
        to { -ms-transform: rotate(0); }
    }
    @-o-keyframes rotate {
        from { -o-transform: rotate(360deg); }
        to { -o-transform: rotate(0); }
    }
    @keyframes rotate {
        from { transform: rotate(360deg); }
        to { transform: rotate(0); }
    }
</style>