// 由 scripts/sync-content.mjs 从 http://127.0.0.1:5210 导出，请勿手工编辑。
// admin 后台是唯一数据源，改完并发布后运行 npm run content:sync 重新生成。
import type { Locale } from '../i18n/locale';
import photo0 from '../assets/albums/admin/album-16-48.webp';
import photo1 from '../assets/albums/admin/album-2000-invasion.webp';
import photo2 from '../assets/albums/admin/album-after-the-forerunner-e-p.webp';
import photo3 from '../assets/albums/admin/album-asteria.webp';
import photo4 from '../assets/albums/admin/album-depressive-emotional-compilation.webp';
import photo5 from '../assets/albums/admin/album-ephemanent.webp';
import photo6 from '../assets/albums/admin/album-ground-attack.webp';
import photo7 from '../assets/albums/admin/album-kakusatsu-shoujo.webp';
import photo8 from '../assets/albums/admin/album-kakusatsu-shoujo-2.webp';
import photo9 from '../assets/albums/admin/album-kakusatsu-shoujo-3.webp';
import photo10 from '../assets/albums/admin/album-kakusatsu-shoujo-4.webp';
import photo11 from '../assets/albums/admin/album-moonshine-001.webp';
import photo12 from '../assets/albums/admin/album-palette-of-clouds.webp';
import photo13 from '../assets/albums/admin/album-s-l-v-t-mixture.webp';
import photo14 from '../assets/albums/thoughts.jpg';
import photo15 from '../assets/albums/thoughts2.jpg';
import photo16 from '../assets/albums/admin/album-track---17.webp';
import photo17 from '../assets/albums/admin/album-track-miranda.webp';
import photo18 from '../assets/albums/admin/album-track-perpetual-status.webp';
import photo19 from '../assets/albums/admin/album-trixxck.webp';

export type AlbumSnapshot = {
  id: string;
  title: string;
  texts: Partial<Record<Locale | 'original', string>>;
  tracks: { title: string; artist: string }[];
  credits: string;
  cover?: string;
  date: string;
  catalog: string;
  category: string;
  bandcamp: string;
  dizzylab: string;
  youtube: string;
  bilibili: string;
};

export const albumSnapshot: AlbumSnapshot[] = [
  {
    "id": "album/16-48",
    "title": "16:48",
    "texts": {
      "zh": "经历了6年的创作生涯后，电子音乐人Joulez在Thoughost推出了他的第一张个人专辑《16:48》，这是他3年来的结晶。\r\n《16:48》是一张音乐、诗歌和摄影作品集，情感在其中流动和驻留。\r\n在十二首乐曲里，我们一起聆听属于他内心的故事。\r\n\r\n听，焦耳。",
      "en": "Electronic music artist Joulez debuts his first solo album “16:48” at Thoughost. The album is the culmination of his work over a period of three years. “16:48” is a collection of music，poetry，and photography where emotions flow and reside.",
      "ja": "",
      "original": "Electronic music artist Joulez debuts his first solo album “16:48” at Thoughost. The album is the culmination of his work over a period of three years. “16:48” is a collection of music，poetry，and photography where emotions flow and reside."
    },
    "tracks": [
      {
        "title": "to Introduce…",
        "artist": "Joulez"
      },
      {
        "title": "i love u / hate myself",
        "artist": "Joulez"
      },
      {
        "title": "a.ll the things I love(d)",
        "artist": "Joulez"
      },
      {
        "title": "continuous deep imagination",
        "artist": "Joulez"
      },
      {
        "title": "sunset (another time)",
        "artist": "Joulez"
      },
      {
        "title": "mermaid of crystal cave",
        "artist": "Joulez"
      },
      {
        "title": "just like glass",
        "artist": "Joulez"
      },
      {
        "title": "unmarked trace",
        "artist": "Joulez"
      },
      {
        "title": "forget.bat",
        "artist": "Joulez"
      },
      {
        "title": "p229 (an interlude)",
        "artist": "Joulez"
      },
      {
        "title": "22-46 november 4th",
        "artist": "Joulez"
      },
      {
        "title": "Or?",
        "artist": "Joulez"
      }
    ],
    "credits": "Produce / Compose / Arrange / Mastering: Joulez\r\nPoetry: Joulez, odoriin, lola螺旯\r\nVocal: lola螺旯 (9 & 12), 除名システム (2 & 9)\r\nDesign: 紺 aka Konseki Takane",
    "cover": photo0,
    "date": "2023-05-02",
    "catalog": "TGSL-001",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/16-48",
    "dizzylab": "https://www.dizzylab.net/d/TGSL-001/",
    "youtube": "https://www.youtube.com/watch?v=t-nTdPQdaCw",
    "bilibili": "https://www.bilibili.com/video/BV1oh411j7AC"
  },
  {
    "id": "album/2000-invasion",
    "title": "2000% INVASION",
    "texts": {
      "zh": "献给想再一次在舞池听到2000s声音的你！\r\n\r\n全14曲超豪华艺术家阵容！还有Konseki Takane, Rin★的献声！\r\nRAVE / EUROBEAT / BUBBLEGUM DANCE / HAPPY HARDCORE / DISCO 等各种令人怀念声音的最大复活!!!",
      "en": "GET YOUR 2000s POWER!!!!!\n\nThose nostalgic synthesizers return!\nLonging to hear the rave sounds of those days in the club once more?\nFor you, Thoughost presents its fifth-anniversary release:\n\n2000% INVASION",
      "ja": "",
      "original": "GET YOUR 2000s POWER!!!!!\r\n\r\n甦る、その懐かしいシンセサイザー！\r\nあの頃のレイヴサウンド、もう一度クラブで聴きたい...！\r\nそんなあなたに、Thoughostの五周年記念新作ーー\r\n\r\n\r\n「2000% INVASION」"
    },
    "tracks": [
      {
        "title": "HIT THE RAVE ANTHEM",
        "artist": "nova+z"
      },
      {
        "title": "Grooooovy↑",
        "artist": "潮音きつね"
      },
      {
        "title": "Afterglow",
        "artist": "inaharu"
      },
      {
        "title": "Call Me",
        "artist": "Nirotiy"
      },
      {
        "title": "Lumière",
        "artist": "wheatfox"
      },
      {
        "title": "Ravenaissance",
        "artist": "Ouuuuuu x DazzEdgh"
      },
      {
        "title": "New Player Adventure",
        "artist": "FreshP"
      },
      {
        "title": "CATCH THE FIRE feat. Konseki Takane",
        "artist": "HASEKO"
      },
      {
        "title": "Better Walk Away",
        "artist": "Violet Delta"
      },
      {
        "title": "Soda",
        "artist": "57Lab"
      },
      {
        "title": "Surf the Ravenet",
        "artist": "Hazecat"
      },
      {
        "title": "Exhausting Mind",
        "artist": "板烧鹅尼子 feat. Rin★"
      },
      {
        "title": "Music Is My Savior",
        "artist": "Supa7onyz"
      },
      {
        "title": "Dream So Real",
        "artist": "Valtrax"
      }
    ],
    "credits": "Artist: nova+z, 潮音きつね, inaharu, Nirotiy, wheatfox, Ouuuuuu, DazzEdgh, FreshP, HASEKO, Violet Delta, 57Lab, Hazecat, 板烧鹅尼子, Supa7onyz, Valtrax\r\nLyric: Black201, JUZIM / Konseki Takane / Hazecat / Mr.skY01 / Supa7onyz\r\nVocal: Konseki Takane / Rin★\r\nMastering: Joulez\r\nIllustration: TARA#376\r\nArt Direction & Design: Konseki Takane\r\nGuitar: 奇异甜食 (track 12)\r\nVocal Editing: HASEKO (track 8), 柳 (track 12)",
    "cover": photo1,
    "date": "2025-10-26",
    "catalog": "THGO-0010",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/2000-invasion",
    "dizzylab": "https://www.dizzylab.net/d/THGO-0010/",
    "youtube": "https://www.youtube.com/watch?v=1B4xuxnS3rg",
    "bilibili": "https://www.bilibili.com/video/BV1GasPz5EW6"
  },
  {
    "id": "album/after-the-forerunner-e-p",
    "title": "After the Forerunner e.p.",
    "texts": {
      "zh": "正是因为他们的启发，我们才会开始音乐创作，因此称呼他们为“先驱者”。\r\n在先驱者后，我们将继续沿着这条路走下去。",
      "en": "They have opened a way for us to be inspired, motivated, and dedicated. That's why we state them as the forerunner.\r\nAfter the forerunner, we started our journey of liberation, emotion, and realization.",
      "ja": "",
      "original": "道を示したこそ、先駆者である。影響を与えられるこそ、音楽活動が始まる。\r\n先駆者の足跡を追随し、私たちがこの道で歩き続くのでしょう。\r\n\r\nThey have opened a way for us to be inspired, motivated, and dedicated. That's why we state them as the forerunner.\r\nAfter the forerunner, we started our journey of liberation, emotion, and realization."
    },
    "tracks": [
      {
        "title": "rotfeldzestroerer",
        "artist": "Joulez"
      },
      {
        "title": "Lumos",
        "artist": "Laxeno57"
      },
      {
        "title": "zentrifugale",
        "artist": "Nirotiy"
      },
      {
        "title": "No Excuse",
        "artist": "DJ Momo"
      },
      {
        "title": "You Are The One",
        "artist": "Irish Kappa"
      },
      {
        "title": "白华",
        "artist": "AiSS"
      }
    ],
    "credits": "Artist: Joulez, Laxeno57, Nirotiy, DJ Momo, Irish Kappa, AiSS\r\nMastering: Joulez\r\nDesigner: Konseki Takane",
    "cover": photo2,
    "date": "2023-04-30",
    "catalog": "TGEP-001",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/album/after-the-forerunner-e-p",
    "dizzylab": "https://www.dizzylab.net/d/TGEP-001/",
    "youtube": "https://www.youtube.com/watch?v=QR7oIx-XOrQ",
    "bilibili": "https://www.bilibili.com/video/BV1R84y1K7if"
  },
  {
    "id": "album/asteria",
    "title": "Asteria",
    "texts": {
      "zh": "从寂静中回归，带回星光的力量。\r\n\r\n《Asteria》是Joulez重回创作后的首部作品。在重拾熟悉的声音同时，也加入了从各种体验中所获得的新声音。\r\n更有Himawari为Track2&3作词并献唱，歌词与人声的交汇，星空仿佛近在咫尺。\r\n另有四首风格迥异的Remix，各自闪烁着不同的光芒。\r\n\r\n明暗闪烁之间，望向星辰。",
      "en": "Returning from silence, carrying the power of starlight.\n\nAsteria is Joulez's first release since returning to music.\nAlongside familiar sounds, it brings in new ones born of new experiences.\nHimawari provides lyrics and vocals for tracks 2 and 3.\nFour distinct remixes complete the release, each shining in its own color.",
      "ja": "",
      "original": "静寂の中から戻ってきて、星の光の力を手にした。\r\n\r\n『Asteria』は、Joulezが音楽活動を再開して初めて作った作品です。\r\n昔ながらのサウンドを活かしつつ、新しい経験から生まれた音も加えています。\r\nTrack 2と3ではHimawariが作詞とボーカルを担当。\r\nさらに4種類のリミックスを収録し、それぞれが違う色で光っています。"
    },
    "tracks": [
      {
        "title": "Tessarect of light and stars",
        "artist": "Joulez"
      },
      {
        "title": "Asteria",
        "artist": "Joulez; Himawari"
      },
      {
        "title": "宙知らぬ星",
        "artist": "Joulez; Himawari"
      },
      {
        "title": "欠片都市 -the shattered past-",
        "artist": "Joulez"
      },
      {
        "title": "Asteria (AiSS Piano Quartet Arr.)",
        "artist": "Joulez, AiSS"
      },
      {
        "title": "Asteria (wheatfox's Neural Botany Mix)",
        "artist": "Joulez, wheatfox"
      },
      {
        "title": "Asteria (望月真白's Jungle Mixed Up)",
        "artist": "Joulez, 望月真白"
      },
      {
        "title": "Asteria (Nirotiy's 'Call of Hecate' ver.)",
        "artist": "Joulez, Nirotiy"
      }
    ],
    "credits": "Produce: Joulez\r\nCompose: Joulez, Himawari\r\nVocal & Lyrics: Himawari\r\nMixing & Mastering: Joulez\r\nRemixes: AiSS, wheatfox, 望月真白, Nirotiy\r\nArt Direction & Design: Konseki Takane",
    "cover": photo3,
    "date": "2025-04-27",
    "catalog": "TGEP-003",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/album/asteria",
    "dizzylab": "https://www.dizzylab.net/d/TGEP-003/",
    "youtube": "https://www.youtube.com/watch?v=DLh-h_fx_vw",
    "bilibili": "https://www.bilibili.com/video/BV1X7dBY3Eyv"
  },
  {
    "id": "album/depressive-emotional-compilation",
    "title": "蒼 -depressive & emotional compilation-",
    "texts": {
      "zh": "先人说苟且而活此事，就是罪孽的堆积。\r\n那我们被生下来这件事，是否是一场诅咒？\r\n\r\n一只青鸟展翅。\r\n向着极高、极高的天空，不知疲倦地飞翔\r\n遮断那太阳，仿佛自己也要变成耀眼的存在\r\n\r\n如果，我也能向那片天空飞去...\r\n情不自禁想入非非、抬起了脚\r\n抵达地面还需要花多久呢，\r\n殊不知这副肉体已然支离破碎\r\n\r\n以中国为起点，日本、英国、法国、俄罗斯……世界各处活跃于互联网中的音乐人相遇于此，用音乐描述心中的那一抹灰色的独特情感。",
      "en": "To go on living is to add to one's sins. Is being born itself a curse?\n\nA blue bird is flying.\nOn and on, tirelessly, toward the distant sky.\nIt eclipses the dazzling sun, as though becoming a dazzling presence itself.\n\nIf only I could fly into that sky.\nLost in a fanciful thought, my feet move of their own accord.\nHow many seconds will the fall take? Before I know it,\nthis body is already in tatters.",
      "ja": "",
      "original": "生き続けることは、罪を重ねることだ。産まれることは呪いではないか？\r\n\r\n蒼い鳥が飛んでいる。\r\nずっと、ずっと遠くの空へ、たゆまず飛んでいる\r\n眩しい太陽を遮って自ら眩しい存在になるようだ\r\n\r\nもし、あの空へ飛べるなら\r\n勝手な思い込み、足元が無意識的に運ぶ\r\n落下するまで何秒かかるのかな、知らず知らずに\r\nこの肉体は既にボロボロ"
    },
    "tracks": [
      {
        "title": "蒼~track 1 lost~",
        "artist": "望月真白"
      },
      {
        "title": "I love u hate myself",
        "artist": "Joulez"
      },
      {
        "title": "Não me lembro da última vez, que eu sai do meu quarto",
        "artist": "f1d31"
      },
      {
        "title": "Mnemosyne",
        "artist": "l!a"
      },
      {
        "title": "Stale Incense",
        "artist": "terminus"
      },
      {
        "title": "Payphone",
        "artist": "Uhp1QVQ"
      },
      {
        "title": "kiss in october",
        "artist": "Kawaii amen girl"
      },
      {
        "title": "Dementia",
        "artist": "Holly"
      },
      {
        "title": "Core of Ascension [Single Vers.]",
        "artist": "Ultima Aevum"
      },
      {
        "title": "私",
        "artist": "Urtica_Ferox_"
      },
      {
        "title": "Solitray World",
        "artist": "rbZodiacX"
      },
      {
        "title": "fun^10 x int^40",
        "artist": "zot!k"
      },
      {
        "title": "死声",
        "artist": "Nirotiy"
      },
      {
        "title": "Obelisk",
        "artist": "ELECTR"
      },
      {
        "title": "zexistenze",
        "artist": "wheatfox"
      },
      {
        "title": "Endlessly Colorless",
        "artist": "oblivious"
      },
      {
        "title": "SAD_POETRY",
        "artist": "illness liquor"
      },
      {
        "title": "Or from July 24th",
        "artist": "Joulez"
      },
      {
        "title": "MeaningLess",
        "artist": "CarameL."
      },
      {
        "title": "Anthropocene",
        "artist": "Laxeno57"
      },
      {
        "title": "l'espoire  en",
        "artist": "BLUE NOISE"
      }
    ],
    "credits": "Artist: 望月真白, Joulez, f1d31, l!a, terminus, Uhp1QVQ, Kawaii amen girl, Holly, Ultima Aevum, Urtica_Ferox_, rbZodiacX, zot!k, Nirotiy, ELECTR, wheatfox, oblivious, illness liquor, CarameL., Laxeno57, BLUE NOISE\r\nMastering: Joulez\r\nIllustrator: 枝乃間\r\nDesigner: Konseki Takane",
    "cover": photo4,
    "date": "2022-10-30",
    "catalog": "THGO-005",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/depressive-emotional-compilation",
    "dizzylab": "https://www.dizzylab.net/d/THGO-005/",
    "youtube": "https://www.youtube.com/watch?v=j2Dttmkxa8Q",
    "bilibili": "https://www.bilibili.com/video/BV13P411P7YW"
  },
  {
    "id": "album/ephemanent",
    "title": "Ephemanent",
    "texts": {
      "zh": "梦幻的音色、怀旧的感受、全新的FREEFORM HARDCORE。",
      "en": "Freeform Hardcore Compilation Album.",
      "ja": "",
      "original": "Freeform Hardcore Compilation Album."
    },
    "tracks": [
      {
        "title": "Cinder Glade",
        "artist": "DJ Momo & ちよもも"
      },
      {
        "title": "Beryl",
        "artist": "Kokomochi"
      },
      {
        "title": "Angel Generator",
        "artist": "Ouuuuuu"
      },
      {
        "title": "Garnet",
        "artist": "KaKi"
      },
      {
        "title": "Universe Outsiderz",
        "artist": "Normal1zer"
      },
      {
        "title": "So What",
        "artist": "Project-G"
      },
      {
        "title": "Event Horizon",
        "artist": "Hyphen"
      },
      {
        "title": "Nightmare Trigger",
        "artist": "MiYAjY"
      },
      {
        "title": "Berzerk",
        "artist": "Joulez"
      },
      {
        "title": "Code Name:Macrocosmos",
        "artist": "Irish Kappa"
      },
      {
        "title": "沉渊低语 (Whispers of Looming Shadows)",
        "artist": "Nirotiy"
      },
      {
        "title": "星冴ゆる霜穹",
        "artist": "潮音きつね_H"
      },
      {
        "title": "Erotomania (除名システム Recover)",
        "artist": "ETIA."
      },
      {
        "title": "Herzschlag (Heartbeat)",
        "artist": "Nirotiy"
      }
    ],
    "credits": "Artist: DJ Momo & ちよもも, Kokomochi, Ouuuuuu, KaKi, Normal1zer, Project-G, Hyphen, MiYAjY, Joulez, Irish Kappa, 潮音きつね_H, Nirotiy\r\nMastering: Joulez\r\nIllustrator: 铫\r\nDesigner: Konseki Takane",
    "cover": photo5,
    "date": "2024-04-28",
    "catalog": "THGO-006",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/ephemanent",
    "dizzylab": "https://www.dizzylab.net/d/THGO-006/",
    "youtube": "https://www.youtube.com/watch?v=e5aSN1LlSMw",
    "bilibili": "https://www.bilibili.com/video/BV1sA4m1c7rB"
  },
  {
    "id": "album/ground-attack",
    "title": "GROUND ATTACK!!!",
    "texts": {
      "zh": "以Funkot / Hard bass / Donk / Tribecore为创作主轴的想灵第二张合辑专辑\r\n『GROUND ATTACK!!!』\r\nFunkot在国内被戏称为敲木鱼音乐，而Hard Bass和Donk又以标志性的Donkbass音色而被戏称为敲水管音乐，加上我们一直都很着迷于Tribecore那股原始的冲劲，于是就有了这张专辑的企划灵感\r\n除了社团成员和公开募集入选者以外，我们还邀请了几位来自日本的Funkot好手『Aki, hayato87b, Liet NRC和totsumal』，以及tekno制作人『4nzu』，最后是我们的老朋友『citybridge』\r\n让这张“土嗨大碟”带给你无穷的能量",
      "en": "Funkot/Hard bass/Donk/Tribecore Compilation Album",
      "ja": "",
      "original": "Funkot/Hard bass/Donk/Tribecore Compilation Album"
    },
    "tracks": [
      {
        "title": "quick intro to 2021 mashup meta",
        "artist": "jakka"
      },
      {
        "title": "massage seat",
        "artist": "Black201"
      },
      {
        "title": "Barbie Disco Tribe",
        "artist": "Aki"
      },
      {
        "title": "BF",
        "artist": "hayato87b"
      },
      {
        "title": "Vertigo",
        "artist": "Liet NRC"
      },
      {
        "title": "Wrench Mind",
        "artist": "totsumal"
      },
      {
        "title": "ロシア Donky Rave",
        "artist": "★Lolitwinx★"
      },
      {
        "title": "Cherrylike",
        "artist": "ELECTR"
      },
      {
        "title": "TWINS",
        "artist": "4nzu"
      },
      {
        "title": "Yarasete Yuri Girl",
        "artist": "Moetek"
      },
      {
        "title": "fallen",
        "artist": "citybridge"
      },
      {
        "title": "Hypoxia_Mrs.SYR",
        "artist": "潮音きつね"
      }
    ],
    "credits": "Artist:jakka, Black201, Aki, hayato87b, Liet NRC, totsumal, ★Lolitwinx★, ELECTR, 4nzu, Moetek, citybridge, 潮音きつね, Mrskey\r\nMastering: Joulez, Project Nirvana\r\nIllustrator: SHIKA\r\nDesigner: Konseki Takane\r\n\r\nSpecial Thanks:\r\n2020 Mandarin Funkot Relay Mix by Japan DJs",
    "cover": photo6,
    "date": "2021-04-05",
    "catalog": "THGO-002",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/ground-attack",
    "dizzylab": "https://www.dizzylab.net/d/THGO-002/",
    "youtube": "https://www.youtube.com/watch?v=rNER-uEazfA",
    "bilibili": "https://www.bilibili.com/video/BV1wK4y1K7wC"
  },
  {
    "id": "album/kakusatsu-shoujo",
    "title": "KAKUSATSU SHOUJO",
    "texts": {
      "zh": "“可爱，暴力，采样”\r\n『KAKUSATSU SHOUJO』\r\n凶暴而又可爱的专辑，终于完成了\r\n我们邀请到了几位日本友人参与制作，同时也有国内第一时间赶来参加的冶炼大师\r\n最令我们开心的，还是邀请到了曾为m1dy，扑杀少女工坊等人绘制封面的『桜都あるす』\r\n也许是国内第一张(?)萝莉核合辑专辑，希望所有热衷LOLICORE的冶炼大师喜欢",
      "en": "LOLICORE COMPILATION ALBUM",
      "ja": "",
      "original": "LOLICORE COMPILATION ALBUM"
    },
    "tracks": [
      {
        "title": "DigDigすぴーど243.4⁉︎_管人の闇a.k.a.ナカノヒト",
        "artist": "潮音きつね_H"
      },
      {
        "title": "家族会議",
        "artist": "uet"
      },
      {
        "title": "Senpai , I want your amen break!!!!♡",
        "artist": "Nirotiy"
      },
      {
        "title": "アーメンとペトラ",
        "artist": "蛇壊乃音"
      },
      {
        "title": "HITENSION+",
        "artist": "Dz'Xa"
      },
      {
        "title": "STRONG 280",
        "artist": "かたぎり"
      },
      {
        "title": "Miu Gakuen Tennis",
        "artist": "Davidsan as hino_amane"
      },
      {
        "title": "Warp A null",
        "artist": "Lzie"
      },
      {
        "title": "Never Ends",
        "artist": "citybridge"
      }
    ],
    "credits": "Artist: 潮音きつね_H, uet, Nirotiy, 蛇壊乃音, Dz'Xa, かたぎり, Davidsan as hino_amane, Lzie, citybridge, DJ Mashiro (2)\r\nMastering: iOM\r\nIllustrator: 桜都あるす\r\nDesigner: Konseki Takane",
    "cover": photo7,
    "date": "2020-06-05",
    "catalog": "THGO-001",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/kakusatsu-shoujo",
    "dizzylab": "https://www.dizzylab.net/d/THGO-001/",
    "youtube": "https://www.youtube.com/watch?v=zxi_GsEwmq0",
    "bilibili": "https://www.bilibili.com/video/BV1j5411x79u"
  },
  {
    "id": "album/kakusatsu-shoujo-2",
    "title": "KAKUSATSU SHOUJO 2",
    "texts": {
      "zh": "KAKUSATSU SHOUJO、归来。\r\n在“Kawaii, Bouryoku, Sampling.”的基础上更进一步，“更混乱和暴力的声音”是本次的主题。\r\n不仅 Dz‘Xa、かたぎり、citybridge 回归，更有 pencil、Null Specification 作为新Guest加入。\r\n全14曲的「KAKUSATSU SHOUJO 2」将在春M3 2022首次颁布。\r\n请欣赏，“狂气”的一册。",
      "en": "KAKUSATSU SHOUJO returns.\nBuilding on \"Kawaii, Bouryoku, Sampling,\" this time the theme is \"even more chaotic and violent sounds.\"\nDz'Xa, かたぎり, and citybridge return, joined by new guests pencil and Null Specification.\nThe 14-track KAKUSATSU SHOUJO 2 will debut at Spring M3 2022.\nEnjoy this volume of madness.",
      "ja": "",
      "original": ""
    },
    "tracks": [
      {
        "title": "うに娘二次創作ガイドライン違反作品",
        "artist": "潮音きつね_H"
      },
      {
        "title": "physching",
        "artist": "Lax1u57"
      },
      {
        "title": "Cannibal Cooker",
        "artist": "Null Specification"
      },
      {
        "title": "Roppongi Crisis",
        "artist": "pencil"
      },
      {
        "title": "REGETNI",
        "artist": "Dz‘Xa"
      },
      {
        "title": "天井から見ると",
        "artist": "四度月白"
      },
      {
        "title": "Secrets",
        "artist": "Aki"
      },
      {
        "title": "#WE_STILL_LOVE_PERFUME",
        "artist": "かたぎり"
      },
      {
        "title": "Iconos Del Anime",
        "artist": "GoldenEggs"
      },
      {
        "title": "Aria'Grief Seed'",
        "artist": "Nirotiy"
      },
      {
        "title": "殻殺 -Instant Bullet-",
        "artist": "望月真白"
      },
      {
        "title": "Succubus Gabber",
        "artist": "M9RVEN"
      },
      {
        "title": "There's no reality",
        "artist": "citybridge"
      },
      {
        "title": "LET ME SAY SANK YOU",
        "artist": "二重死後磁場"
      }
    ],
    "credits": "Artist: Dz'Xa, Null Specification, pencil, GoldenEggs, Lax1u57, Aki, かたぎり, citybridge, Nirotiy, 二重死後磁場, 望月真白, 四度夜 靈, 潮音きつね_H, M9RVEN\r\nMastering: Joulez\r\nIllustrator: だんごむし\r\nDesigner: Konseki Takane",
    "cover": photo8,
    "date": "2022-04-24",
    "catalog": "THGO-004",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/kakusatsu-shoujo-2",
    "dizzylab": "https://www.dizzylab.net/d/THGO-004/",
    "youtube": "https://www.youtube.com/watch?v=rDYUHIXwATk",
    "bilibili": "https://www.bilibili.com/video/BV1jY4y1a78w"
  },
  {
    "id": "album/kakusatsu-shoujo-3",
    "title": "KAKUSATSU SHOUJO 3",
    "texts": {
      "zh": "核杀少女、三次冲击。\r\n\r\n不仅M9RVEN、かたぎり、Aki、Null Specification回归，还有新面孔Moetek、Yakumo，更有公开募集获胜者nova+z！\r\n\r\n全10曲的「KAKUSATSU SHOUJO 3」将在Comic Market 104首次颁布。",
      "en": "KAKUSATSU SHOUJO: the third impact.\n\nM9RVEN, かたぎり, Aki, and Null Specification return, alongside new faces Moetek and Yakumo, and open-call winner nova+z!\n\nThe 10-track KAKUSATSU SHOUJO 3 will debut at Comic Market 104.",
      "ja": "",
      "original": ""
    },
    "tracks": [
      {
        "title": "ぶっこぬき音源！ブレイクコアで抜いてしまったサキュバス賀馬ちゃん！",
        "artist": "M9RVEN, 望月真白"
      },
      {
        "title": "Sekarashikh",
        "artist": "Moetek"
      },
      {
        "title": "DJ Momo is Nothing Without her TEK Feat.The Operation",
        "artist": "DJ Momo"
      },
      {
        "title": "Tanuki-Mujina Incident",
        "artist": "かたぎり"
      },
      {
        "title": "クソアニメは、ニオイで分かりまするぞ",
        "artist": "nova+z"
      },
      {
        "title": "Inversion",
        "artist": "Aki"
      },
      {
        "title": "しかのこシコシコ腰パンパン",
        "artist": "潮音きつね_H"
      },
      {
        "title": "RmL3Th",
        "artist": "Null Specification"
      },
      {
        "title": "FOOTPRINTS -雨ノ宮-",
        "artist": "望月真白"
      },
      {
        "title": "天狱",
        "artist": "Yakumo"
      }
    ],
    "credits": "Artist: M9RVEN, Moetek, DJ Momo, かたぎり, nova+z, Aki, 潮音きつね_H, Null Specification, 望月真白, Yakumo\r\nMastering: Joulez\r\nIllustrator: だんごむし\r\nDesigner: Konseki Takane",
    "cover": photo9,
    "date": "2024-08-12",
    "catalog": "THGO-007",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/kakusatsu-shoujo-3",
    "dizzylab": "https://www.dizzylab.net/d/THGO-007/",
    "youtube": "https://www.youtube.com/watch?v=2Ge-DW5YniM",
    "bilibili": "https://www.bilibili.com/video/BV1pHYMeqEjt"
  },
  {
    "id": "album/kakusatsu-shoujo-4",
    "title": "KAKUSATSU SHOUJO 4",
    "texts": {
      "zh": "用 4 倍的可爱！造成 4 倍的破坏！ \r\n\r\n焕然一新的核杀少女，迎来uet、pencil、Yakumo的回归！\r\n还有 COPYRiGHT JOKER、DENPA-SAMPLER、Broken Nerdz、Project-G、kiralitch 初登场\r\n\r\n「KAKUSATSU SHOUJO 4」将在C108首次颁布。",
      "en": "Four times the cuteness! Four times the destruction!\n\nA renewed KAKUSATSU SHOUJO welcomes back uet, pencil, and Yakumo!\nCOPYRiGHT JOKER, DENPA-SAMPLER, Broken Nerdz, Project-G, and kiralitch make their first appearances.\n\nKAKUSATSU SHOUJO 4 will debut at C108.",
      "ja": "",
      "original": ""
    },
    "tracks": [
      {
        "title": "Please warm me UP!",
        "artist": "𝘼𝙘𝙩𝙪𝙖𝙡𝙡𝙮"
      },
      {
        "title": "chaoin kitsune is a fake moebuta he hasnt even watched YURUYURI",
        "artist": "七森中☆でんぱ部"
      },
      {
        "title": "Paradigm Shift",
        "artist": "DENPA-SAMPLER"
      },
      {
        "title": "・２０８８~PLANETARY VIDEO⭐STAR~",
        "artist": "DazzEdgh"
      },
      {
        "title": "#WE_LOVE_PERFUME_FOREVER",
        "artist": "Nirotiy"
      },
      {
        "title": "Double Bind",
        "artist": "pencil"
      },
      {
        "title": "33122promptz",
        "artist": "Project-G"
      },
      {
        "title": "Heroine Lose, Cum to Daddies",
        "artist": "uet"
      },
      {
        "title": "YOWA-YOWA-STYLE",
        "artist": "COPYRiGHT JOKER"
      },
      {
        "title": "Mode: Crimson Eye",
        "artist": "Yakumo"
      },
      {
        "title": "Blight Flower",
        "artist": "kiralitch"
      },
      {
        "title": "第1話：ニャル子、征服す",
        "artist": "Mqs_T"
      },
      {
        "title": "ZUNDA TERROR ~ずんだもんの声を265回以上サンプリングしたのだ~",
        "artist": "Broken Nerdz"
      },
      {
        "title": "Fractured Sequencer",
        "artist": "望月真白"
      },
      {
        "title": "こんるる復活祭",
        "artist": "潮音きつね"
      }
    ],
    "credits": "Mastering: Joulez\nIllustration: だんごむし\nDesign: Konseki Takane",
    "cover": photo10,
    "date": "2026-08-16",
    "catalog": "THGO-0012",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/kakusatsu-shoujo-4",
    "dizzylab": "https://www.dizzylab.net/d/THGO-0012/",
    "youtube": "https://www.youtube.com/watch?v=QCdK8yFO95k",
    "bilibili": "https://www.bilibili.com/video/BV1DfgG62E7U"
  },
  {
    "id": "album/moonshine-001",
    "title": "MOONSHINE #001",
    "texts": {
      "zh": "\"月光\"的醍醐味，今宵且沉醉于微醺之中。\r\n\r\nTECHNO合辑 \"MOONSHINE #001\"，收录11首个性鲜明的Techno作品。\r\n邀请到 A.I. / Project-G / Irish Kappa / Yazavva / NANO_TAN / FISHY / Y. / KeiuO 组成豪华Guest阵！",
      "en": "Savor the spirit of MOONSHINE. Tonight, let yourself drift into a gentle intoxication.\n\nThe techno compilation MOONSHINE #001 brings together 11 tracks spanning a diverse range of techno styles.",
      "ja": "",
      "original": "MOONSHINEの醍醐味、今宵はほろ酔いに浸ろう。\r\n\r\nTECHNOコンピレーション「MOONSHINE #001」、多彩なスタイルのテクノ全11曲を収録。"
    },
    "tracks": [
      {
        "title": "long out of nacht",
        "artist": "Nirotiy"
      },
      {
        "title": "a4",
        "artist": "A.I."
      },
      {
        "title": "Ground State",
        "artist": "Project-G"
      },
      {
        "title": "BIAS",
        "artist": "潮音きつね"
      },
      {
        "title": "Disoriented Field",
        "artist": "Irish Kappa"
      },
      {
        "title": "Proc",
        "artist": "Yazavva"
      },
      {
        "title": "Acid Cagger",
        "artist": "NANO_TAN"
      },
      {
        "title": "DUNGEON TECH",
        "artist": "FISHY"
      },
      {
        "title": "STAGE 5 GAS",
        "artist": "Y."
      },
      {
        "title": "MIRAI",
        "artist": "KeiuO"
      },
      {
        "title": "Something out of Your TECHNO",
        "artist": "Darkness Peach"
      }
    ],
    "credits": "Artist: Nirotiy, A.I., Project-G, 潮音きつね, Irish Kappa, Yazavva, NANO_TAN, FISHY, Y., KeiuO, Darkness Peach\r\nMastering: 火烧\r\nIllustration&Design: 豆腐",
    "cover": photo11,
    "date": "2025-10-26",
    "catalog": "THGO-009",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/moonshine-001",
    "dizzylab": "https://www.dizzylab.net/d/THGO-009/",
    "youtube": "https://www.youtube.com/watch?v=Aqtx3A-HXEw",
    "bilibili": "https://www.bilibili.com/video/BV15PWbz2EvG"
  },
  {
    "id": "album/palette-of-clouds",
    "title": "palette of clouds",
    "texts": {
      "zh": "这些云朵便是我的调色盘，我用它来描绘那些我从他人口中听来的故事。",
      "en": "Nirotiy's 1st EP. These clouds are my palette, which I use to paint stories gathered from others.",
      "ja": "これらの雲は私のパレットであり、私はそれを使って、人から聞いた物語を描いています。",
      "original": "Nirotiy's 1st EP. These clouds are my palette, which I use to paint stories gathered from others."
    },
    "tracks": [
      {
        "title": "cirrostratus fibratus",
        "artist": "Nirotiy"
      },
      {
        "title": "stratocumulus undulatus",
        "artist": "Nirotiy"
      },
      {
        "title": "cumulonimbus",
        "artist": "Nirotiy"
      },
      {
        "title": "noctilucent clouds",
        "artist": "Nirotiy"
      },
      {
        "title": "nimbostratus (2024)",
        "artist": "Nirotiy"
      }
    ],
    "credits": "All by Nirotiy\r\nProduce: Nirotiy",
    "cover": photo12,
    "date": "2024-10-27",
    "catalog": "TGEP-002",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/album/palette-of-clouds",
    "dizzylab": "https://www.dizzylab.net/d/TGEP-002/",
    "youtube": "https://www.youtube.com/watch?v=rlf_6l5C9Gs",
    "bilibili": "https://www.bilibili.com/video/BV1F1yeYjE5t"
  },
  {
    "id": "album/s-l-v-t-mixture",
    "title": "S.L.V.T: MIXTURE",
    "texts": {
      "zh": "深暗色的无机质的流动中，晕染上故障般的颜色。\r\n解码它吧。一窥其中。\r\n由Thoughost的成员Nirotiy、望月真白制作的合作专辑【S.L.V.T: MIXTURE】\r\n本次特别邀请到了: 空読無 白眼, Coredump Breaks参与",
      "en": "A deep, dark, inorganic mass, its flow haloed in the colors of a malfunction.\nLet us decode it. Glimpse everything contained in this MIXTURE.\n\nNirotiy x 望月真白 Split Album",
      "ja": "",
      "original": "流れの中で誤作動の色にハレーションを起こした、深く暗い無機質な塊。\r\nそれをデコードしよう。このMIXTRUEに含まれる全てを垣間見る。\r\n\r\nNirotiy x 望月真白 Split Album"
    },
    "tracks": [
      {
        "title": "Verwirrung (Confusion) - Club Edit",
        "artist": "Nirotiy"
      },
      {
        "title": "CHAOSHAN WISEGUYS",
        "artist": "DJ MASHIRO (2)"
      },
      {
        "title": "Jiehkki (Glacier)",
        "artist": "Nirotiy"
      },
      {
        "title": "INFERNAL AFFAIRS",
        "artist": "望月真白"
      },
      {
        "title": "Hollow Heaven Underneath",
        "artist": "望月真白 ft. Nirotiy"
      },
      {
        "title": "Bluntungen (Blood)",
        "artist": "Nirotiy"
      },
      {
        "title": "Verwirrung - 空読無 白眼 REMIX",
        "artist": "Nirotiy"
      },
      {
        "title": "INFERNAL AFFAIRS - Coredump Breaks REMIX",
        "artist": "望月真白"
      },
      {
        "title": "MEGA BANGiN TUNES BATT1E",
        "artist": "The DJ 白手 Producer (2)"
      },
      {
        "title": "Jiehkki (Glacier) - D3llketa MaxhIro REMIXXX",
        "artist": "Nirotiy"
      }
    ],
    "credits": "Produced&Artist: Nirotiy, 望月真白\r\nSpecial Guest: 空読無 白眼, Coredump Breaks\r\nMastering: Joulez\r\nCover Artwork : Nirotiy\r\nCo-Designer: Konseki Takane",
    "cover": photo13,
    "date": "2022-03-12",
    "catalog": "THGO-003",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/s-l-v-t-mixture",
    "dizzylab": "https://www.dizzylab.net/d/THGO-003/",
    "youtube": "https://www.youtube.com/watch?v=Ibpu6ScyVPA",
    "bilibili": "https://www.bilibili.com/video/BV1UR4y1G74T"
  },
  {
    "id": "album/thoughts",
    "title": "thoughts",
    "texts": {
      "zh": "新系列 \"thoughts\"\r\n以各种各样的音乐贯彻主题，挖掘属于\"Thoughost\"声音的系列。\r\n这次的主题是“rebirth\"。\r\n\r\n本次邀请到 VeetaCrush / Rayven / かたぎり / Aki Sz 作为Guest，\r\n也欢迎 TARA#376 担任\"thoughts\"的系列画家。\r\n\r\n特设页面：\r\nhttps://thoughost.com/special/thoughts",
      "en": "\"Discover our own sound.\"\n\nIntroducing thoughts, a new series that explores a single theme through a variety of genres.\n\nThis time, the theme is \"rebirth.\"\n\nFeaturing guests VeetaCrush, Rayven, かたぎり, and Aki Sz, with TARA#376 as the illustrator for the thoughts series.",
      "ja": "",
      "original": "\"Discover our own sound.\"\r\n\r\n新シリーズ「thoughts」とは\r\n様々なジャンルで一つのテーマを貫くシリーズ。\r\n\r\n今回のテーマは「rebirth」です。\r\n\r\nゲストにVeetaCrush、Rayven、かたぎり、Aki Szを迎え、\r\nさらにTARA#376が「thoughts」シリーズのイラストレーターを担当しています。"
    },
    "tracks": [
      {
        "title": "palette ii",
        "artist": "VeetaCrush"
      },
      {
        "title": "Awake",
        "artist": "Joulez"
      },
      {
        "title": "幽けきルミノールライト",
        "artist": "潮音きつね"
      },
      {
        "title": "Lucidandelion",
        "artist": "望月真白"
      },
      {
        "title": "Titania",
        "artist": "Aki Sz"
      },
      {
        "title": "December",
        "artist": "かたぎり"
      },
      {
        "title": "6 p.m.",
        "artist": "wheatfox"
      },
      {
        "title": "Voix sacrée",
        "artist": "Nirotiy"
      },
      {
        "title": "曇天",
        "artist": "桃罐"
      },
      {
        "title": "Epilogue",
        "artist": "Rayven"
      }
    ],
    "credits": "Artist: VeetaCrush, Joulez, 潮音きつね, 望月真白, Aki Sz, かたぎり, wheatfox, Nirotiy, 桃罐, Rayven\r\nMastering: Valtrax\r\nIllustrator: TARA#376\r\nArt Direction & Design: Konseki Takane\r\nVocal: Joulez (track 2)",
    "cover": photo14,
    "date": "2025-04-27",
    "catalog": "THGO-008",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/thoughts",
    "dizzylab": "https://www.dizzylab.net/d/THGO-008/",
    "youtube": "https://www.youtube.com/watch?v=Ybambkc3hAo",
    "bilibili": "https://www.bilibili.com/video/BV1yTLczhEH5"
  },
  {
    "id": "album/thoughts-2",
    "title": "thoughts 2",
    "texts": {
      "zh": "「从 thoughts 到 thoughts 2，系列从这里开始。」\r\n\r\n本次的主题是\"hesitate\"\r\n\r\n与 \"1\" 共同组成系列开篇的新作 \"thoughts 2\"，汇聚了14位艺术家的想法。\r\nIDM / Ambient / Garage / Trance / Breakcore ...等 多种多样的流派收录其中。\r\n\r\n特设页面: \r\nhttps://thoughost.com/special/thoughts2",
      "en": "From “thoughts” to “thoughts 2,” a series begins.\n\nThis time, the theme is “hesitate.”\n\nFourteen artists give shape to their thoughts through a diverse range of genres, including IDM, ambient, and breakbeats.",
      "ja": "",
      "original": "「thoughts」から「thoughts 2」へ。シリーズがここから始まる。\r\n\r\n今回のテーマは「hesitate」です。\r\n\r\n14名のアーティストによる『思考』を、IDM / アンビエント / ブレイクビーツなど多彩なジャンルで形にしました。"
    },
    "tracks": [
      {
        "title": "Fading Echoes",
        "artist": "ARMYTOM"
      },
      {
        "title": "Fluorescent",
        "artist": "wheatfox"
      },
      {
        "title": "landingfailure.orz",
        "artist": "nova+z"
      },
      {
        "title": "winding stairs",
        "artist": "Aki Sz"
      },
      {
        "title": "stutter and dissolve",
        "artist": "イベライ/Emelia"
      },
      {
        "title": "Seven...",
        "artist": "sanmal"
      },
      {
        "title": "Valkyrie",
        "artist": "Joulez"
      },
      {
        "title": "循環の果てにて、",
        "artist": "潮音きつね"
      },
      {
        "title": "DEPICT CODE",
        "artist": "Nirotiy"
      },
      {
        "title": "間",
        "artist": "四度夜 靈"
      },
      {
        "title": "Drown...",
        "artist": "望月真白"
      },
      {
        "title": "Southern Barbarian in Oversized Clothes",
        "artist": "Kolaa ft. Money Master"
      },
      {
        "title": "Don't Leave Me",
        "artist": "Irish Kappa"
      },
      {
        "title": "ending",
        "artist": "VeetaCrush"
      }
    ],
    "credits": "Artist: Aki Sz, ARMYTOM, イベライ/Emelia, Irish Kappa, Joulez, Kolaa ft. Money Master, 望月真白, Nirotiy, nova+z, sanmal, 四度夜 靈, 潮音きつね, VeetaCrush, wheatfox\r\nMastering: Joulez\r\nIllustration: TARA#376\r\nArt Direction & Design: Konseki Takane",
    "cover": photo15,
    "date": "2026-04-26",
    "catalog": "THGO-0011",
    "category": "compilation-solo",
    "bandcamp": "https://thoughost.bandcamp.com/album/thoughts-2",
    "dizzylab": "https://www.dizzylab.net/d/THGO-0011/",
    "youtube": "https://www.youtube.com/watch?v=Ffq6CAnfjEk",
    "bilibili": "https://www.bilibili.com/video/BV19EowBTEf1"
  },
  {
    "id": "album/track---17",
    "title": "春ノ終焉",
    "texts": {
      "zh": "这是春天的谢幕。",
      "en": "Here, spring comes to an end.",
      "ja": "",
      "original": "春の終焉、ここに。"
    },
    "tracks": [
      {
        "title": "春ノ終焉",
        "artist": "Joulez, 月見静華"
      }
    ],
    "credits": "",
    "cover": photo16,
    "date": "2025-07-25",
    "catalog": "TGSG-002",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/track/--17",
    "dizzylab": "https://www.dizzylab.net/d/TGSG-002/",
    "youtube": "",
    "bilibili": ""
  },
  {
    "id": "album/track-miranda",
    "title": "Series Planet Exploration - Miranda -",
    "texts": {
      "zh": "米兰达\r\n天王星第五卫星。\r\n离地球很远，有太阳系最高的悬崖，维罗纳断崖。\r\n人类发现了无限广阔的宇宙之宏大，心中萌生了探究心。\r\n我虽然是天文学的外行，但一想到其深度约为5～10km的悬崖绝壁的深度以及其形成的爆炸和粉末的样子，我就在思考如何将其作为感觉和歌曲来表现。\r\n而这首歌便是如此。\r\n通过几首曲子，探索各种各样的行星。\r\n如果您能听得开心就太好了。\r\n\r\n——From Nirotiy.",
      "en": "Miranda.\nThe fifth satellite of Uranus.\nFar far away from planet earth,With the highest cliff in solar system,Verona Rupes.\nAs human discovered the magnificence of the endless universe surround themselves,a sense of exploration is growing in their minds.\nFor me though,I'm no amateur astronomer.But when I think about the depth of that cliff about 5-10 kilometers and the explosion and shattering that formed it,I started to.wondering how to make those thing into a sensation and a song.\nAnd here it is. \nA series of different planets will be explored through a number of songs.\nI hope you can enjoy it.\n\nFrom Nirotiy.",
      "ja": "",
      "original": "English\nMiranda.\nThe fifth satellite of Uranus.\nFar far away from planet earth,With the highest cliff in solar system,Verona Rupes.\nAs human discovered the magnificence of the endless universe surround themselves,a sense of exploration is growing in their minds.\nFor me though,I'm no amateur astronomer.But when I think about the depth of that cliff about 5-10 kilometers and the explosion and shattering that formed it,I started to.wondering how to make those thing into a sensation and a song.\nAnd here it is. \nA series of different planets will be explored through a number of songs.\nI hope you can enjoy it.\n\nJapanese\nミランダ\n\n天王星の第5衛星。\n\n地球から遠く離れ、太陽系で最も高い崖、ヴェローナ・ルーペスがあります。\n\n無限に広がる宇宙の壮大さを発見した人類の心の中には、探究心が芽生えていた。\n\n私は天文学の素人ではありませんが、その深さ約5〜10kmの断崖絶壁の深さと、それを形成した爆発と粉々になった様子を考えると、それをどうやって感覚や歌にしたらいいのかと考えていました。\n\nそして、それがここにあります。\n \nいくつもの曲を通して、様々な惑星を探っていきます。\n\n楽しんでもらえれば幸いです。\n\n——From Nirotiy."
    },
    "tracks": [
      {
        "title": "Series Planet Exploration - Miranda -",
        "artist": "Nirotiy"
      }
    ],
    "credits": "",
    "cover": photo17,
    "date": "2020-07-10",
    "catalog": "TGSG-001",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/track/series-planet-exploration-miranda",
    "dizzylab": "https://www.dizzylab.net/d/TGSG-001/",
    "youtube": "",
    "bilibili": ""
  },
  {
    "id": "album/track-perpetual-status",
    "title": "Perpetual Status -転生する天使-",
    "texts": {
      "zh": "",
      "en": "For one of the three craziest Doku-Denpa Galgames——さよならを教えて～comment te dire adieu～\r\nComposed by 望月真白 aka DJ Mashiro (2)\r\nhttps://twitter.com/Dazzletek_",
      "ja": "",
      "original": "For one of the three craziest Doku-Denpa Galgames——さよならを教えて～comment te dire adieu～\r\nComposed by 望月真白 aka DJ Mashiro (2)\r\nhttps://twitter.com/Dazzletek_"
    },
    "tracks": [
      {
        "title": "Perpetual Status -転生する天使-",
        "artist": "DJ Mashiro (2)"
      }
    ],
    "credits": "",
    "cover": photo18,
    "date": "2020-09-09",
    "catalog": "待核对",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/track/perpetual-status",
    "dizzylab": "",
    "youtube": "",
    "bilibili": ""
  },
  {
    "id": "album/trixxck",
    "title": "TRIXXCK",
    "texts": {
      "zh": "Thoughost × Silent Xords特别合作万圣节EP\r\n『TRIXXCK』",
      "en": "Thoughost × Silent Xords Special Halloween EP",
      "ja": "",
      "original": "Thoughost × Silent Xords Special Halloween EP"
    },
    "tracks": [
      {
        "title": "Intro",
        "artist": "Nirotiy"
      },
      {
        "title": "MADCINE",
        "artist": "Nirotiy"
      },
      {
        "title": "The Blood Spitted On Me",
        "artist": "BlueWind"
      },
      {
        "title": "ジレンマと枯れ葉",
        "artist": "DJ Mashiro (2)"
      },
      {
        "title": "Verdammnis",
        "artist": "Nirotiy"
      },
      {
        "title": "Nothing but escape",
        "artist": "Black201"
      },
      {
        "title": "fish_man feat. Nirotiy",
        "artist": "潮音きつね_H"
      }
    ],
    "credits": "Artist: Nirotiy, BlueWind, DJ Mashiro (2), Black201, 潮音きつね_H\r\nMastering: BlueWind\r\nIllustrator: SCAF\r\nDesigner: Konseki Takane",
    "cover": photo19,
    "date": "2021-11-03",
    "catalog": "TGSP-001",
    "category": "ep-single",
    "bandcamp": "https://thoughost.bandcamp.com/album/trixxck",
    "dizzylab": "https://www.dizzylab.net/d/TGSP-001/",
    "youtube": "https://www.youtube.com/watch?v=6wP9eyJrKk0",
    "bilibili": "https://www.bilibili.com/video/BV1pQ4y1S7bd"
  }
];
