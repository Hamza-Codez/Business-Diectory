export type Lang = "en" | "ja";

type Messages = {
  nav: {
    home: string;
    categories: string;
    blogs: string;
    pricing: string;
    contact: string;
    cta: string;
  };
  hero: { title: string; subtitle: string; cta: string };
  featured: { title: string; subtitle: string };
  searchBand: {
    title: string;
    keywordPlaceholder: string;
    locationPlaceholder: string;
    allCategories: string;
    search: string;
    popular: string;
  };
  connect: { title: string; p1: string; p2: string; cta: string };
  popular: { title: string; subtitle: string };
  blogs: { title: string };
  why: { title: string; blocks: { claim: string; support: string }[] };
  footer: { description: string; privacy: string; terms: string; rights: string };
  search: {
    results: string;
    allBusinesses: string;
    found: string; // "{n}" is replaced with the count
    all: string;
    loadMore: string;
    empty: string;
    error: string;
    unavailable: string;
    retry: string;
    restaurants: string;
    services: string;
    hotels: string;
    within: string; // "{n}" is replaced with the km radius
    noExact: string; // "{c}" is replaced with the category label
    powered: string;
  };
  heroBadge: string;
  heroStats: {
    places: string;
    live: string;
    liveLabel: string;
    users: string;
    prefectures: string;
  };
  listed: { eyebrow: string; title: string; subtitle: string; viewAll: string };
  directory: { eyebrow: string; title: string; subtitle: string; explore: string };
  categoriesPage: { eyebrow: string; title: string; subtitle: string };
  blogsPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    empty: string;
    more: string;
  };
  pricingPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    plans: {
      lite: { name: string; tagline: string; };
      standard: { name: string; tagline: string; };
      business: { name: string; tagline: string; };
    };
    intervals: {
      perYear: string;
      perSixMonth: string;
      lessThanMonth: string;
      saveYear: string;
    };
    badges: { recommended: string; };
    cta: string;
    table: {
      heading: string;
      features: {
        name: string;
        lite: boolean | string;
        standard: boolean | string;
        business: boolean | string;
      }[];
    };
  };
  breadcrumb: { home: string; blogs: string };
  businessCard: { website: string; viewDetails: string };
  businessDetail: {
    address: string;
    phone: string;
    hours: string;
    website: string;
    visitSite: string;
    getDirections: string;
    moreIn: string; // "{c}" category, "{loc}" location suffix
    near: string; // "{city}"
    nearby: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    whyPartner: string;
    rapidResponse: string;
    rapidResponseDesc: string;
    b2bFocused: string;
    b2bFocusedDesc: string;
    sendMessage: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  addBusiness: {
    eyebrow: string;
    title: string;
    subtitle: string;
    highVisibility: string;
    b2bNetwork: string;
    verifiedTrust: string;
    basicInfo: string;
    businessName: string;
    businessNamePlaceholder: string;
    category: string;
    selectCategory: string;
    catManufacturing: string;
    catTechnology: string;
    catRetail: string;
    catServices: string;
    yearEstablished: string;
    yearEstablishedPlaceholder: string;
    locationContact: string;
    fullAddress: string;
    fullAddressPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    publicEmail: string;
    publicEmailPlaceholder: string;
    digitalPresence: string;
    website: string;
    websitePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    disclaimer: string;
    submit: string;
  };
};

export const MESSAGES: Record<Lang, Messages> = {
  en: {
    nav: {
      home: "Home",
      categories: "Categories",
      blogs: "Blogs",
      pricing: "Pricing",
      contact: "Contact",
      cta: "Add your business",
    },
    hero: {
      title: "Find any business in Japan.",
      subtitle:
        "Addresses, phone numbers, hours, and reviews — for suppliers, services, and everything in between.",
      cta: "Start searching",
    },
    featured: {
      title: "Featured categories",
      subtitle: "What do you need to find?",
    },
    searchBand: {
      title: "Discover business & experts in Japan",
      keywordPlaceholder: "What are you looking for?",
      locationPlaceholder: "Location",
      allCategories: "All categories",
      search: "Search",
      popular: "Popular searches",
    },
    connect: {
      title: "Connect with more customers.",
      p1: "List your business on Japan's growing directory. Your address, hours, and contact details — visible to people already looking for what you do.",
      p2: "Claim your listing today and start getting found.",
      cta: "Get in touch",
    },
    popular: {
      title: "Popular categories",
      subtitle: "Where people search the most.",
    },
    blogs: { title: "Recent blogs" },
    why: {
      title: "Why choose us",
      blocks: [
        {
          claim: "Real addresses, real locations",
          support: "Every listing carries an address and map coordinates.",
        },
        {
          claim: "Search that respects your time",
          support: "Keyword, category, and location — one bar, one click.",
        },
        {
          claim: "Open, verifiable data",
          support:
            "Built on OpenStreetMap and official Japanese sources, not scraped guesses.",
        },
      ],
    },
    footer: {
      description:
        "Find any business in Japan — addresses, hours, and contact details in one place.",
      privacy: "Privacy",
      terms: "Terms",
      rights: "© 2026 Japan Directory. All rights reserved.",
    },
    search: {
      results: "Search results",
      allBusinesses: "All businesses",
      found: "{n} found",
      all: "All",
      loadMore: "Load more",
      empty: "No businesses found for this search.",
      error: "Couldn't load results. Refresh to try again.",
      unavailable: "Search is temporarily unavailable — try again in a moment.",
      retry: "Retry",
      restaurants: "Restaurants",
      services: "Services",
      hotels: "Hotels",
      within: "Showing results within {n} km.",
      noExact: "No exact matches — showing nearby {c} results instead.",
      powered: "Powered by Hot Pepper Gourmet Web Service",
    },
    heroBadge: "日本のビジネス — Japan Business Directory",
    heroStats: {
      places: "Places mapped across Japan",
      live: "Live",
      liveLabel: "Data · updated hourly",
      users: "Users helped",
      prefectures: "Prefectures · nationwide coverage",
    },
    listed: {
      eyebrow: "ビジネス — BUSINESSES",
      title: "Listed Businesses",
      subtitle: "A rotating sample of what's listed across Japan.",
      viewAll: "View All Businesses",
    },
    directory: {
      eyebrow: "ディレクトリ — DIRECTORY",
      title: "Finding Experts",
      subtitle: "Swipe through our diverse range of business categories.",
      explore: "Explore further",
    },
    categoriesPage: {
      eyebrow: "カテゴリー",
      title: "All Categories",
      subtitle: "Browse all business categories across Japan",
    },
    blogsPage: {
      eyebrow: "記事 — ARTICLES",
      title: "Blogs",
      subtitle: "Guides to finding, reaching, and working with businesses in Japan.",
      empty: "No blogs found.",
      more: "More blogs",
    },
    pricingPage: {
      eyebrow: "料金プラン — PRICING",
      title: "Pricing Plans",
      subtitle: "Choose the best plan to empower your business.",
      plans: {
        lite: { name: "Lite", tagline: "Upgrade to Lite - Expand Your Opportunities." },
        standard: { name: "Standard", tagline: "Step Up to Standard - Stand Out, Uplift Your Success!" },
        business: { name: "Business", tagline: "Upgrade to Business - Empower Your Business with the Best." },
      },
      intervals: {
        perYear: "/ Year",
        perSixMonth: "/ Six Month",
        lessThanMonth: "Less than $38 / Month",
        saveYear: "Save 25% on Year plan",
      },
      badges: { recommended: "Recommended" },
      cta: "Get Started",
      table: {
        heading: "Feature Comparison",
        features: [
          { name: "Search Engine Optimization (SEO)", lite: true, standard: true, business: true },
          { name: "Search Visibility", lite: "Medium", standard: "High", business: "Priority" },
          { name: "Max Product Listings", lite: "100", standard: "200", business: "500" },
          { name: "B2B Lead Inquiries", lite: "100 / Month", standard: "200 / Month", business: "500 / Month" },
          { name: "Dedicated Account Manager", lite: false, standard: false, business: true },
          { name: "Custom Analytics Dashboard", lite: false, standard: true, business: true },
          { name: "Sponsored Blog Content", lite: false, standard: "1 Post / Year", business: "2 Posts / Year" },
          { name: "Verified Business Badge", lite: true, standard: true, business: true },
        ]
      }
    },
    breadcrumb: { home: "Home", blogs: "Blogs" },
    businessCard: { website: "Website", viewDetails: "View details for" },
    businessDetail: {
      address: "Address",
      phone: "Phone",
      hours: "Hours",
      website: "Website",
      visitSite: "Visit site",
      getDirections: "Get directions",
      moreIn: "More in {c} {loc}",
      near: "near {city}",
      nearby: "nearby",
    },
    contact: {
      eyebrow: "お問い合わせ — CONTACT",
      title: "Let's build together",
      subtitle:
        "Whether you need support, want to list your business, or are looking for partnerships across Japan, our team is ready.",
      whyPartner: "Why Partner With Us?",
      rapidResponse: "Rapid Response",
      rapidResponseDesc:
        "We aim to reply to all inquiries within 24 hours during standard business days.",
      b2bFocused: "B2B Focused",
      b2bFocusedDesc:
        "Our network specifically targets high-value B2B relationships across all 47 prefectures.",
      sendMessage: "Send a Message",
      firstName: "First Name",
      firstNamePlaceholder: "John",
      lastName: "Last Name",
      lastNamePlaceholder: "Doe",
      email: "Email Address",
      emailPlaceholder: "john@example.com",
      subject: "Subject",
      subjectPlaceholder: "How can we help?",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      submit: "Transmit Message",
    },
    addBusiness: {
      eyebrow: "ビジネスを登録 — ADD BUSINESS",
      title: "Expand Your Reach in Japan",
      subtitle:
        "Join thousands of trusted companies. Submit your business details below to be verified and listed in our directory.",
      highVisibility: "High Visibility",
      b2bNetwork: "B2B Network",
      verifiedTrust: "Verified Trust",
      basicInfo: "1. Basic Information",
      businessName: "Business Name *",
      businessNamePlaceholder: "Acme Corp Japan",
      category: "Category *",
      selectCategory: "Select a category",
      catManufacturing: "Manufacturing",
      catTechnology: "Technology & IT",
      catRetail: "Retail & Trade",
      catServices: "Professional Services",
      yearEstablished: "Year Established",
      yearEstablishedPlaceholder: "e.g. 1995",
      locationContact: "2. Location & Contact",
      fullAddress: "Full Address *",
      fullAddressPlaceholder: "1-1-1 Marunouchi, Chiyoda-ku, Tokyo",
      phone: "Phone Number *",
      phonePlaceholder: "+81 3-XXXX-XXXX",
      publicEmail: "Public Email",
      publicEmailPlaceholder: "contact@acmecorp.jp",
      digitalPresence: "3. Digital Presence & Details",
      website: "Website URL",
      websitePlaceholder: "https://acmecorp.jp",
      description: "Business Description (Max 500 characters) *",
      descriptionPlaceholder:
        "Briefly describe your products, services, and target market...",
      disclaimer:
        "By submitting this form, you verify that you are an authorized representative of this business. All submissions are manually reviewed before publishing.",
      submit: "Submit Listing",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      categories: "カテゴリー",
      blogs: "記事",
      pricing: "料金プラン",
      contact: "お問い合わせ",
      cta: "ビジネスを掲載",
    },
    hero: {
      title: "日本のあらゆるビジネスを見つける。",
      subtitle:
        "住所、電話番号、営業時間、レビュー — サプライヤーからサービスまで、すべてを。",
      cta: "検索を始める",
    },
    featured: {
      title: "注目のカテゴリー",
      subtitle: "何をお探しですか？",
    },
    searchBand: {
      title: "日本のビジネスと専門家を見つけよう",
      keywordPlaceholder: "何をお探しですか？",
      locationPlaceholder: "場所",
      allCategories: "すべてのカテゴリー",
      search: "検索",
      popular: "人気の検索",
    },
    connect: {
      title: "もっと多くのお客様とつながる。",
      p1: "成長を続ける日本のビジネスディレクトリに掲載しませんか。住所、営業時間、連絡先が、あなたを探している人に届きます。",
      p2: "今すぐ掲載して、見つけてもらいましょう。",
      cta: "お問い合わせ",
    },
    popular: {
      title: "人気のカテゴリー",
      subtitle: "最も検索されているカテゴリー。",
    },
    blogs: { title: "最新の記事" },
    why: {
      title: "選ばれる理由",
      blocks: [
        {
          claim: "正確な住所と位置情報",
          support: "すべての掲載に住所と地図座標が含まれています。",
        },
        {
          claim: "時間を尊重する検索",
          support: "キーワード、カテゴリー、場所 — 一つのバー、一回のクリック。",
        },
        {
          claim: "オープンで検証可能なデータ",
          support: "OpenStreetMapと日本の公的な情報源に基づいています。",
        },
      ],
    },
    footer: {
      description: "日本のあらゆるビジネス — 住所、営業時間、連絡先を一か所で。",
      privacy: "プライバシー",
      terms: "利用規約",
      rights: "© 2026 Japan Directory. All rights reserved.",
    },
    search: {
      results: "検索結果",
      allBusinesses: "すべてのビジネス",
      found: "{n}件",
      all: "すべて",
      loadMore: "もっと見る",
      empty: "該当するビジネスが見つかりませんでした。",
      error: "結果を読み込めませんでした。再読み込みしてください。",
      unavailable: "検索は一時的に利用できません。しばらくしてからもう一度お試しください。",
      retry: "再試行",
      restaurants: "レストラン",
      services: "サービス",
      hotels: "ホテル",
      within: "{n} km以内の結果を表示しています。",
      noExact: "完全に一致する結果はありません。近くの{c}の結果を表示しています。",
      powered: "提供：ホットペッパー グルメ ウェブサービス",
    },
    heroBadge: "日本のビジネス — Japan Business Directory",
    heroStats: {
      places: "日本全国でマッピングされた場所",
      live: "ライブ",
      liveLabel: "データ · 毎時更新",
      users: "支援したユーザー数",
      prefectures: "都道府県 · 全国対応",
    },
    listed: {
      eyebrow: "ビジネス — BUSINESSES",
      title: "掲載中のビジネス",
      subtitle: "日本全国の掲載情報から入れ替わりでご紹介します。",
      viewAll: "すべてのビジネスを見る",
    },
    directory: {
      eyebrow: "ディレクトリ — DIRECTORY",
      title: "専門家を見つける",
      subtitle: "多彩なビジネスカテゴリーをスワイプしてご覧ください。",
      explore: "さらに見る",
    },
    categoriesPage: {
      eyebrow: "カテゴリー",
      title: "すべてのカテゴリー",
      subtitle: "日本全国のビジネスカテゴリーを閲覧",
    },
    blogsPage: {
      eyebrow: "記事 — ARTICLES",
      title: "記事",
      subtitle: "日本のビジネスを見つけ、つながり、協働するためのガイド。",
      empty: "記事が見つかりませんでした。",
      more: "その他の記事",
    },
    pricingPage: {
      eyebrow: "料金プラン — PRICING",
      title: "料金プラン",
      subtitle: "ビジネスを加速させる最適なプランをお選びください。",
      plans: {
        lite: { name: "ライト", tagline: "ライトプランへアップグレード - 機会を広げましょう。" },
        standard: { name: "スタンダード", tagline: "スタンダードへステップアップ - 際立ち、成功を高めましょう！" },
        business: { name: "ビジネス", tagline: "ビジネスプランへアップグレード - 最高の機能でビジネスを強化します。" },
      },
      intervals: {
        perYear: "/ 年",
        perSixMonth: "/ 半年",
        lessThanMonth: "月額38ドル以下",
        saveYear: "年間プランで25%オフ",
      },
      badges: { recommended: "おすすめ" },
      cta: "はじめる",
      table: {
        heading: "機能比較",
        features: [
          { name: "検索エンジン最適化（SEO）", lite: true, standard: true, business: true },
          { name: "検索での可視性", lite: "中", standard: "高", business: "最優先" },
          { name: "最大製品掲載数", lite: "100", standard: "200", business: "500" },
          { name: "B2Bリード問い合わせ", lite: "100件 / 月", standard: "200件 / 月", business: "500件 / 月" },
          { name: "専任アカウントマネージャー", lite: false, standard: false, business: true },
          { name: "カスタム分析ダッシュボード", lite: false, standard: true, business: true },
          { name: "スポンサー記事コンテンツ", lite: false, standard: "1記事 / 年", business: "2記事 / 年" },
          { name: "認証済みビジネスバッジ", lite: true, standard: true, business: true },
        ]
      }
    },
    breadcrumb: { home: "ホーム", blogs: "記事" },
    businessCard: { website: "ウェブサイト", viewDetails: "詳細を見る：" },
    businessDetail: {
      address: "住所",
      phone: "電話番号",
      hours: "営業時間",
      website: "ウェブサイト",
      visitSite: "サイトを見る",
      getDirections: "経路を表示",
      moreIn: "{loc}の{c}をもっと見る",
      near: "{city}周辺",
      nearby: "近く",
    },
    contact: {
      eyebrow: "お問い合わせ — CONTACT",
      title: "一緒に築きましょう",
      subtitle:
        "サポートが必要な方、ビジネスを掲載したい方、日本全国でのパートナーシップをお探しの方 — 私たちのチームがお手伝いします。",
      whyPartner: "私たちと組む理由は？",
      rapidResponse: "迅速な対応",
      rapidResponseDesc:
        "通常営業日には、すべてのお問い合わせに24時間以内の返信を目指しています。",
      b2bFocused: "B2Bに特化",
      b2bFocusedDesc:
        "私たちのネットワークは、47都道府県すべてにわたる価値の高いB2B関係を対象としています。",
      sendMessage: "メッセージを送る",
      firstName: "名",
      firstNamePlaceholder: "太郎",
      lastName: "姓",
      lastNamePlaceholder: "山田",
      email: "メールアドレス",
      emailPlaceholder: "taro@example.com",
      subject: "件名",
      subjectPlaceholder: "どのようなご用件ですか？",
      message: "メッセージ",
      messagePlaceholder: "ここにメッセージをご記入ください...",
      submit: "メッセージを送信",
    },
    addBusiness: {
      eyebrow: "ビジネスを登録 — ADD BUSINESS",
      title: "日本でのリーチを広げましょう",
      subtitle:
        "信頼される数千の企業に加わりましょう。以下にビジネス情報をご入力いただくと、確認のうえディレクトリに掲載されます。",
      highVisibility: "高い露出",
      b2bNetwork: "B2Bネットワーク",
      verifiedTrust: "認証済みの信頼",
      basicInfo: "1. 基本情報",
      businessName: "ビジネス名 *",
      businessNamePlaceholder: "Acme Corp Japan",
      category: "カテゴリー *",
      selectCategory: "カテゴリーを選択",
      catManufacturing: "製造業",
      catTechnology: "テクノロジー・IT",
      catRetail: "小売・貿易",
      catServices: "専門サービス",
      yearEstablished: "設立年",
      yearEstablishedPlaceholder: "例：1995",
      locationContact: "2. 所在地・連絡先",
      fullAddress: "住所 *",
      fullAddressPlaceholder: "東京都千代田区丸の内1-1-1",
      phone: "電話番号 *",
      phonePlaceholder: "+81 3-XXXX-XXXX",
      publicEmail: "公開用メール",
      publicEmailPlaceholder: "contact@acmecorp.jp",
      digitalPresence: "3. デジタルプレゼンス・詳細",
      website: "ウェブサイトURL",
      websitePlaceholder: "https://acmecorp.jp",
      description: "ビジネスの説明（最大500文字）*",
      descriptionPlaceholder:
        "製品、サービス、対象市場について簡単にご説明ください...",
      disclaimer:
        "このフォームを送信することで、あなたがこのビジネスの正式な代表者であることを確認します。すべての送信内容は公開前に手動で審査されます。",
      submit: "掲載を申請",
    },
  },
};
