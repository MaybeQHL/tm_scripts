import axios from 'axios'
import { type } from 'os';


const utils = {
    addCss(str_css) {
        var style = document.createElement("style");
        style.textContent = str_css;
        document.getElementsByTagName("head").item(0).appendChild(style);
    },
    getParam(name) {
        var search = document.location.search;
        //alert(search);
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    },
    async getDanmu(keyword, epindex) {
        try {

            const headers = {
                clientVersion: '5.19.2',
                clienttype: 'android_XiaoMi',
            }
            const reSearch = await axios.get('https://api.rr.tv/search/v5/season', {
                headers,
                params: {
                    keywords: keyword
                }
            })
            const dramaId = reSearch.data.data[0].id;
            // debugger;
            // api.rr.tv/drama/detail?isAgeLimit=false&dramaId=320&episodeSid=26993&quality=HD&subtitle=3&hsdrOpen=1
            const reDetail = await axios.get('https://api.danmu.oyyds.top/api/message/getRrDanmakuDetail', {
                headers,
                params: {
                    dramaId
                }
            })

            const episodeId = reDetail.data.data.episodeList.find(ep => ep.episodeNo == epindex).id

            const reDms = await axios.get(`https://static-dm.rr.tv/v1/produce/danmu/EPISODE/${episodeId}`, {
                headers,
            })

            let dms = reDms.data;

            // 格式化弹幕
            let res = (dms).map((it, index) => {
                const pobj = it.p.split(',')
                return {
                    id: 'rr_' + index,
                    text: it.d,
                    time: pobj[0],
                    style: {
                        fontSize: '20px',
                        color: '#ffffff',
                        lineHeight: '2em'
                    },
                }
            })

            // 重新排序
            res = res.sort((a, b) => a.time - b.time);

            return res
        } catch (error) {
            console.error(error.message)
            // GM_notification('[my_danmu]' + '暂无弹幕')
            return []
        }
    },

    getMediaInfo() {
        const result = {
            name: '',
            episode: 1
        }

        const currentUrl = String(window.location.href);

        console.log(currentUrl)

        const list = [{
            url: 'https://ddys.tv',
            type: 'ddys'
        }, {
            url: 'https://ddys2.me',
            type: 'ddys'
        },
        {
            url: 'https://ddys2.me',
            type: 'ddys'
        }
        ]

        let typeObj = list.find(it => currentUrl.indexOf(it.url) != -1);

        console.log('typeObj', typeObj)

        if (typeObj) {

            switch (typeObj.type) {
                case 'ddys':
                    const names = document.querySelector('.cute').textContent.split(' ');
                    result.name = names[0] + names[1];
                    const ep = utils.getParam('ep');
                    result.episode = Number(ep && ep != 0 ? ep : 1);
                    break;

                default:
                    break;
            }

        }
        return result;

    }
}



export default utils