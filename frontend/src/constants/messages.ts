export type Lang = "en" | "ja";

type Messages = {
  nav: {
    home: string;
    categories: string;
    articles: string;
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
  articles: { title: string };
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
  };
};

export const MESSAGES: Record<Lang, Messages> = {
  en: {
    nav: {
      home: "Home",
      categories: "Categories",
      articles: "Articles",
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
    articles: { title: "Recent articles" },
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
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      categories: "カテゴリー",
      articles: "記事",
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
    articles: { title: "最新の記事" },
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
    },
  },
};
