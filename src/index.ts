import Danmaku from 'danmaku';
import utils from './utils';


let danmaku: Danmaku;
let currentUrl;

const initDm = async () => {

    const mediaInfo = utils.getMediaInfo();

    const dms = await utils.getDanmu(mediaInfo.name, mediaInfo.episode)

    const videoEl = document.querySelector('video');

    const videoWrapEl = videoEl.parentElement;

    let dmWrapEl;


    // 容器样式
    const classStr = `.videoWrapEl{position:absolute;top:0;left:0;right:0;height:${videoWrapEl.clientHeight / 2}px;line-height:1.2em;} .videoWrapEl div {
        
    }`;

    utils.addCss(classStr)

    dmWrapEl = document.createElement('div')

    dmWrapEl.classList.add('videoWrapEl')

    videoWrapEl.append(dmWrapEl)

    danmaku = null;

    danmaku = new Danmaku({
        container: dmWrapEl,
        media: videoEl,
        comments: dms,
        // engine: 'canvas',
    });

    const resize = () => {
        danmaku.resize();
    }

    window.removeEventListener('resize', resize)

    // 窗口大小改变重置弹幕
    window.addEventListener('resize', resize)

}

const initEpisodeChange = () => {
    currentUrl = window.location.href;
    document.addEventListener('click', async (e) => {
        if (window.location.href != currentUrl) {
            // currentUrl = window.location.href;
            window.location.reload();

        }

    })
}

initDm();

initEpisodeChange();
