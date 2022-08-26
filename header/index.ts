import { GmFunctions, RunAt, UserScript } from "./UserScript";
import build from "./build";

const script: UserScript = {
    name: '爱弹幕',
    namespace: 'https://github.com/MaybeQHL/tm_scripts',
    description: 'H5播放器自动装载弹幕',
    version: '1.0.7',
    license: "MIT",
    includes: ['https://ddys2.me/*', 'https://ddys.tv/*'],
    grants: [
        GmFunctions.unsafeWindow
    ],
    runAt: RunAt.document_end,
    resources: [
    ]
}

build(script, 'app_header.js')
