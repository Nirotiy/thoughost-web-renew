// 由 scripts/sync-content.mjs 从 http://127.0.0.1:5210 导出，请勿手工编辑。
// admin 后台是唯一数据源，改完并发布后运行 npm run content:sync 重新生成。
import type { Locale } from '../i18n/locale';
import photo0 from '../assets/members/chaoyin.png';
import photo1 from '../assets/members/konseki-color.png';
import photo2 from '../assets/members/erua.jpg';
import photo3 from '../assets/members/rmdyh.jpg';
import photo4 from '../assets/members/admin/member-2.webp';
import photo5 from '../assets/members/admin/member-3.webp';
import photo6 from '../assets/members/laxeno.jpg';
import photo7 from '../assets/members/joulez2.png';
import photo8 from '../assets/members/wheatfox.jpg';
import photo9 from '../assets/members/shidoye.png';
import photo10 from '../assets/members/black201.png';
import photo11 from '../assets/members/novaz.png';

export type MemberSnapshot = {
  title: string;
  texts: Partial<Record<Locale | 'original', string>>;
  links: { label: string; url: string }[];
  photo?: string;
  crop: number;
  order: number;
};

export const memberSnapshot: MemberSnapshot[] = [
  {
    "title": "潮音きつね",
    "texts": {
      "zh": "潮音きつね，aka HERkomachi aka 黒猫です！\n\n主要创作 techno 等四拍子系音乐，偶尔也会尝试其他风格（比如 Breakcore、电波歌等）。最近热衷于硬件合成器。\n\nななひらForever．．．",
      "en": "I'm 潮音きつね, aka HERkomachi aka 黒猫です！\n\nI mainly produce four-on-the-floor styles like techno, and occasionally try other genres (breakcore, denpa songs, and so on). Lately I've been hooked on hardware synths.\n\nNanahira Forever...",
      "ja": "潮音きつね aka HERkomachi aka 黒猫です！\n\n主にtechnoなどの四つ打ち系を作っています。時々他のジャンル(ブレイクコアとか電波ソングとか)も試しています。最近はハードウェアシンセに熱中しています。\n\nななひらForever．．．",
      "original": "潮音きつね aka HERkomachi aka 黒猫です！\n\n主にtechnoなどの四つ打ち系を作っています。時々他のジャンル(ブレイクコアとか電波ソングとか)も試しています。最近はハードウェアシンセに熱中しています。\n\nななひらForever．．．"
    },
    "links": [
      {
        "label": "X",
        "url": "https://x.com/xo_kuroneko"
      },
      {
        "label": "Soundcloud",
        "url": "https://soundcloud.com/krnk-xo"
      },
      {
        "label": "Youtube",
        "url": "https://www.youtube.com/@xo_kuroneko"
      }
    ],
    "photo": photo0,
    "crop": 0,
    "order": 0
  },
  {
    "title": "Konseki Takane",
    "texts": {
      "zh": "Thoughost 的 Art Direction、Graphic Design、制作进行 担当。\n同时也是一名DJ。\n以音乐为主轴，制作了各种各样的艺术作品。\n为多个音乐厂牌和艺术家制作封面、LOGO、海报 等，在商业领域也活跃着，曾为音乐游戏DEFLATE制作字标。\n也是同人音乐频道 \"Doujin Life's Cafe\" 的主负责人，主办了很多音乐活动。",
      "en": "Konseki Takane handles Art Direction, Graphic Design, and production coordination at Thoughost, and also works as a DJ.\n\nHe creates a wide variety of artworks with music as the central theme, and has designed covers, logos, posters and more for many music labels and artists. He is also active commercially, having created the wordmark for the rhythm game DEFLATE.\n\nHe is also the head of the doujin music channel \"Doujin Life's Cafe\", and has organized many music events.",
      "ja": "Thoughost にて Art Direction・Graphic Design・制作進行を担当。DJ としても活動中。\n\n音楽を主軸に、さまざまなアートワークを制作。\n\n数多くの音楽レーベルやアーティストのジャケット、ロゴ、ポスターなどを手がけ、商業分野でも活躍。リズムゲーム『DEFLATE』のロゴタイプも制作した。\n\n同人音楽チャンネル「Doujin Life's Cafe」の主催者でもあり、数多くの音楽イベントを主催してきた。",
      "original": ""
    },
    "links": [
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/32101676"
      },
      {
        "label": "X",
        "url": "https://x.com/Konseki_Takane"
      }
    ],
    "photo": photo1,
    "crop": 50,
    "order": 1
  },
  {
    "title": "Foe Requiem",
    "texts": {
      "zh": "嗨，这里是 Erua。\n\n在 Thoughost 负责记账与后勤支持，每天都在努力工作。\n\n闲暇时经常玩音乐游戏（MUG）和策略游戏（SLG），或者干脆躺平放空。我喜欢的音乐风格多种多样，很难说哪一种是最爱。\n\n没有苏打水就活不下去。\n\n侧马尾的动漫女孩就是正义！",
      "en": "Hi, Erua. here\n\nWorking hard in counter and support thoughost’s accounting.\nI often play MUG and SLG in my free time, or just lay down and space out, and I love varieties of music style that is hard to say which is my favorite.\nCan not live without soda water.\n\nAnime grils with sidetail is justice!",
      "ja": "やあ、Erua です。\n\nThoughost で経理とサポート業務に奮闘しています。\n\n暇なときはよく音楽ゲーム（MUG）やシミュレーションゲーム（SLG）をプレイしたり、ただ寝転がってぼーっとしたり。好きな音楽のジャンルは多彩すぎて、どれが一番とは言えません。\n\n炭酸水がないと生きていけません。\n\nサイドテールのアニメの女の子こそ正義！",
      "original": ""
    },
    "links": [],
    "photo": photo2,
    "crop": 50,
    "order": 10
  },
  {
    "title": "rmdyh",
    "texts": {
      "zh": "我是 rmdyh，对 Web 开发略懂一二。在 Thoughost 负责搭建官网。\n\n我喜欢 Galgame、音游和东方 Project。手机上也会玩很多游戏，但几乎没有一款能坚持每天玩超过半年。\n\n\"WELCOME TO OSU!\"",
      "en": "This is rmdyh, with some understanding of web development. At Thoughost, I am responsible for building the homepage website.\nI like Galgames, rhythm games, and Touhou Project. I also play lots of games on my mobile, but I can hardly persist in playing one game every day for more than six months.\n\"WELCOME TO OSU!\"",
      "ja": "rmdyh です。Web 開発は多少わかります。Thoughost では公式サイトの構築を担当しています。\n\nギャルゲー、音ゲー、東方Project が好き。スマホでもいろんなゲームを遊びますが、毎日続けられるのは半年が限界です。\n\n\"WELCOME TO OSU!\"",
      "original": ""
    },
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/rmdyh"
      }
    ],
    "photo": photo3,
    "crop": 50,
    "order": 11
  },
  {
    "title": "望月真白",
    "texts": {
      "zh": "Based in Shenzhen，2020年起开始作为制作人/DJ，活跃于大大小小的同人社团/俱乐部。Trance与Breakcore是他的电子乐启蒙，致力于打造鼓编密集、律动丰富，氛围旋律为主体，却又巧妙融为一体的声音。现在也会出现在アニクラ现场，激烈的合成器和每一次转调都让他兴奋。\n身为Thoughost副主催的同时，也曾为不少日本的友邻社团、国际厂牌供曲，并在Otherman Records推出了自己的第一张Solo Album。\n曾与Axorst2K在东京一同呈现Deconstructed Club/Post-Trance vibes的系列活动「儚」。",
      "en": "Based in Shenzhen, he has been active as a producer/DJ since 2020, playing across doujin circles and clubs of all sizes. Trance and breakcore were his gateway into electronic music; he strives for dense, groovy drum work built around atmospheric melodies, all fused together with a deft touch. He can also be found at anikura (anime club) events, where fierce synths and every key change get him fired up.\n\nAs vice-organizer of Thoughost, he has also contributed tracks to many friendly Japanese circles and international labels, and released his first solo album on Otherman Records.\n\nTogether with Axorst2K he presented the Tokyo event series \"儚\" (Hakanai), exploring Deconstructed Club / Post-Trance vibes.",
      "ja": "深セン在住。2020年よりプロデューサー／DJとして、大小さまざまな同人サークルやクラブで活動。Trance と Breakcore がエレクトロニック・ミュージックとの出会いであり、密度の高いドラムと豊かなグルーヴ、アンビエントなメロディを軸にしながらも、巧みに融け合うサウンドを目指している。現在はアニクラの現場にも姿を見せ、激しいシンセと度重なる転調に興奮している。\n\nThoughost の副主催である一方、日本の友好サークルや海外レーベルにも楽曲を提供し、Otherman Records から初のソロ・アルバムをリリースした。\n\nAxorst2K と共に、Deconstructed Club / Post-Trance のバイブスを探求する東京のイベントシリーズ「儚」を主宰した。",
      "original": ""
    },
    "links": [],
    "photo": photo4,
    "crop": 50,
    "order": 2
  },
  {
    "title": "Nirotiy",
    "texts": {
      "zh": "生于安徽，现居杭州。\n音乐制作品牌 Sequro 创始人，国内多个知名同人音乐社团核心创作者。深耕同人音乐创作7年，曾为数个音乐游戏及手游提供过原创曲目，受委托制作曲目（合作和单人）数十首。\n- 音乐优势：高能量或氛围主导型电子音乐。",
      "en": "Born in Anhui, now based in Hangzhou.\n\nFounder of the music production brand Sequro, and a core creator in several well-known doujin music circles in China. With over seven years of deep involvement in doujin music, he has provided original tracks for a number of music games and mobile games, and has produced dozens of commissioned tracks (both collaborations and solo work).\n\n- Musical strengths: high-energy or atmosphere-driven electronic music.",
      "ja": "安徽省生まれ、現在は杭州在住。\n\n音楽制作ブランド Sequro の創業者であり、国内の著名な同人音楽サークル数団体の中心メンバーとしても活動。同人音楽創作に7年以上携わり、これまでに複数の音楽ゲーム・スマホゲームへオリジナル楽曲を提供。依頼制作（コラボ・単独）は数十曲にのぼる。\n\n- 得意とする音楽：高エネルギー、もしくはアンビエント主体のエレクトロニック・ミュージック。",
      "original": ""
    },
    "links": [
      {
        "label": "Linktree",
        "url": "https://linktr.ee/nirotiy"
      },
      {
        "label": "X",
        "url": "https://x.com/nirotiy"
      },
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/31292875"
      }
    ],
    "photo": photo5,
    "crop": 36,
    "order": 3
  },
  {
    "title": "57lab",
    "texts": {
      "zh": "你好，我是 Laxeno57。\n\n我对多种风格的音乐都感兴趣，也制作着跨度很广的各种风格——有些风格之间差异极大，例如 Breakcore、摇滚、原声与爵士等。希望我的作品能带给你画面感与美学体验。",
      "en": "Hello, I'm Laxeno57.\nI'm interested in many styles of music, and I also produce a very wide variety of styles, some of which are extreme and far from each other, such as breakcore, rock and acoustic, and jazz, to name a few. I hope that my work will bring you images and aesthetics.",
      "ja": "こんにちは、Laxeno57 です。\n\n多くのスタイルの音楽に興味があり、幅広いジャンルを制作しています。Breakcore、ロック、アコースティック、ジャズなど、互いに遠く離れた極端なスタイルも含みます。私の作品が、皆さんにイメージと美学を届けられますように。",
      "original": ""
    },
    "links": [
      {
        "label": "X",
        "url": "https://x.com/_57Lab"
      },
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/1472248051"
      }
    ],
    "photo": photo6,
    "crop": 50,
    "order": 4
  },
  {
    "title": "Joulez",
    "texts": {
      "zh": "Joulez来自上海，他是混迹在同人音乐人群中的孤魂。\n从2016年开始他就开始制作音乐，从最早的Garageband玩家一路坚持到了现在。\n虽然他以Trance而知名，但他也热爱制作包括Drum n Bass，Ambient，以及摇滚在内的其他风格。\n现在他在Thoughost担任母带工程师并业余开发吉他效果器。",
      "en": "Joulez is from Shanghai — a lone spirit drifting through the doujin music crowd.\n\nHe started making music in 2016, going from an early GarageBand tinkerer to where he is today.\n\nThough best known for trance, he also loves producing other styles, including drum 'n' bass, ambient, and rock.\n\nHe currently works at Thoughost as a mastering engineer, and develops guitar effects pedals on the side.",
      "ja": "上海出身の Joulez は、同人音楽の世界に漂う孤高の魂。\n\n2016年から音楽制作を始め、最初は GarageBand で遊んでいたプレイヤーから、今日までずっと作り続けてきた。\n\nTrance で知られるが、Drum 'n' Bass や Ambient、ロックなど他のジャンルの制作も愛している。\n\n現在は Thoughost でマスタリング・エンジニアを務め、趣味でギターエフェクターも開発している。",
      "original": ""
    },
    "links": [
      {
        "label": "X",
        "url": "https://x.com/JavelinMaxx"
      },
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/21030832"
      }
    ],
    "photo": photo7,
    "crop": 50,
    "order": 5
  },
  {
    "title": "wheatfox",
    "texts": {
      "zh": "他于2022年开始电子音乐创作，主要创作 Liquid Funk、Neurofunk 与 Jazz Hip-Hop。他的作品大多带有温暖、现代的都市气息，Neurofunk 方面则带有神话般的神秘色彩，同时更具力量感。\n2023年5月加入 Thoughost，也曾在 Omniset Records、Kreuzwave、FLUXWAV 等社团与厂牌发表作品。在商业领域，他为 dizzylab 的音乐游戏《DEFLATE》提供过乐曲，并为东方 Project、《来自深渊》等题材的同人游戏创作过配乐。\n",
      "en": "He started making electronic music in 2022, mainly Liquid Funk, Neurofunk and Jazz Hip-Hop. Much of his work has a warm, modern urban feel, while his Neurofunk is mythic and otherworldly in mood, and considerably more powerful.\nHe joined Thoughost in May 2023 and has also released music through Omniset Records, Kreuzwave and FLUXWAV. Commercially, he has provided music for dizzylab's rhythm game DEFLATE, and has scored doujin games based on Touhou Project and Made in Abyss.",
      "ja": "2022年よりエレクトロニック・ミュージックの制作を開始。主に Liquid Funk、Neurofunk、Jazz Hip-Hop を制作している。彼の作品は温かくモダンな都会の空気感を持ち、Neurofunk では神話的なミステリーとともに、よりパワフルな表現を見せる。\n\n2023年5月に Thoughost に加入。Omniset Records、Kreuzwave、FLUXWAV などのサークル・レーベルでも作品を発表。商業分野では dizzylab のリズムゲーム『DEFLATE』に楽曲を提供し、東方Project や『メイドインアビス』など原作の同人ゲームのサウンドトラックも手がけている。",
      "original": ""
    },
    "links": [
      {
        "label": "X",
        "url": "https://x.com/wheat_fox"
      },
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/305084932"
      },
      {
        "label": "Soundcloud",
        "url": "https://soundcloud.com/wheatfox"
      },
      {
        "label": "Bandcamp",
        "url": "https://wheatfox.bandcamp.com"
      }
    ],
    "photo": photo8,
    "crop": 50,
    "order": 6
  },
  {
    "title": "四度夜 靈",
    "texts": {
      "zh": "四度跨越长夜的灵。\n深受AcuticNotes、ELECTROCUTICA等艺术家的音乐触动，开始了音乐制作。以Artcore、Breaks、Drum&Bass、IDM等流派为主，追求更细腻深邃的情感表达。",
      "en": "A spirit that crosses the long night four times over.\n\nMoved by the music of artists such as AcuticNotes and ELECTROCUTICA, he began producing. Working mainly in Artcore, Breaks, Drum & Bass, and IDM, he pursues finer, deeper emotional expression.",
      "ja": "四度、長い夜を越える霊。\n\nAcuticNotes や ELECTROCUTICA といったアーティストの音楽に深く心を動かされ、音楽制作を始めた。Artcore、Breaks、Drum & Bass、IDM などを中心に、より繊細で深い感情表現を追求している。",
      "original": ""
    },
    "links": [
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/1446530346"
      },
      {
        "label": "X",
        "url": "https://x.com/sdy0_zai"
      }
    ],
    "photo": photo9,
    "crop": 70,
    "order": 7
  },
  {
    "title": "Black201",
    "texts": {
      "zh": "小学时代即接触同人音乐，中学时代开始自学吉他。2019年正式开启音乐制作生涯，以「创作不受限的多元音乐」为目标。\n2020年，凭借在『GROUND ATTACK!!!』中发表的『Massage Seat』正式步入同人音乐圈。2022年，为追求更纯粹的自我表达，创立了个人社团「桃罐 (Momokan)」。2025年，与 AiSS、Nirotiy 携手创立 Sequro。至今，他仍保持着旺盛的创作欲，在音乐的广阔世界中不断探索。\n\n",
      "en": "He encountered doujin music in elementary school, and began teaching himself guitar in middle school. In 2019 he officially started producing music, with the goal of \"creating unrestricted, diverse music.\"\n\nIn 2020 he formally entered the doujin scene with \"Massage Seat\", released on GROUND ATTACK!!!. In 2022, seeking purer self-expression, he founded his personal circle \"Momokan (桃罐)\". In 2025 he co-founded Sequro with AiSS and Nirotiy. To this day he keeps his creative drive burning, exploring the vast world of music.",
      "ja": "小学生の頃に同人音楽と出会い、中学生の頃にギターを独学で始める。2019年に正式に音楽制作のキャリアをスタートし、「制限のない多様な音楽」を目指している。\n\n2020年、『GROUND ATTACK!!!』に発表した『Massage Seat』で同人音楽シーンに正式デビュー。2022年、より純粋な自己表現を求めて個人サークル「桃罐 (Momokan)」を設立。2025年には AiSS、Nirotiy と共に Sequro を設立。今も旺盛な創作意欲を持ち続け、音楽の広い世界を探求し続けている。",
      "original": ""
    },
    "links": [
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/6993889"
      },
      {
        "label": "X",
        "url": "https://x.com/Black201_wav"
      },
      {
        "label": "bandcamp",
        "url": "https://momokan.bandcamp.com/"
      },
      {
        "label": "pixiv",
        "url": "https://www.pixiv.net/users/42568058"
      }
    ],
    "photo": photo10,
    "crop": 50,
    "order": 8
  },
  {
    "title": "nova+z",
    "texts": {
      "zh": "nova+z，aka Zsul Pavon，1999年生。\n2022年起在网络上发布音乐作品，不拘泥于单一流派，只做当下觉得有趣的声音。\n擅长以电子音乐为骨架，融入不同的色彩，始终注重作品本身的立意与表达。",
      "en": "nova+z, aka Zsul Pavon, born 1999.\n\nHe has been releasing music online since 2022, never bound to a single genre — he simply makes whatever sounds interesting to him at the moment.\n\nSkilled at building on an electronic music backbone while blending in different colors, he always puts the intent and expression of each piece first.",
      "ja": "nova+z、別名 Zsul Pavon。1999年生まれ。\n\n2022年よりネット上で音楽作品を発表。単一のジャンルに縛られず、その時々で面白いと思う音だけを作っている。\n\nエレクトロニック・ミュージックを骨格に、さまざまな色彩を溶け込ませるのが得意。作品の意図と表現を常に大切にしている。",
      "original": ""
    },
    "links": [
      {
        "label": "X",
        "url": "https://x.com/novaxz_nobasu"
      },
      {
        "label": "bilibili",
        "url": "https://space.bilibili.com/31785876"
      },
      {
        "label": "Soundcloud",
        "url": "https://soundcloud.com/novaxz_aspr"
      },
      {
        "label": "YouTube",
        "url": "https://www.youtube.com/@novaxz_aspr"
      },
      {
        "label": "Bandcamp",
        "url": "https://novaxz.bandcamp.com/"
      }
    ],
    "photo": photo11,
    "crop": 70,
    "order": 9
  }
];
