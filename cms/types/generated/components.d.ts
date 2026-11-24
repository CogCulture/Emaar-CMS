import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedVideoEmbed extends Schema.Component {
  collectionName: 'components_sections_video_embeds';
  info: {
    displayName: 'Video Embed';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Attribute.Media<'images', true>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media<'images'>;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
    description: '';
  };
  attributes: {
    file: Attribute.Media<'images'>;
  };
}

export interface SectionsThankYou extends Schema.Component {
  collectionName: 'components_sections_thank_yous';
  info: {
    displayName: 'Thank You';
    icon: 'check-circle';
    description: 'Enquiry confirmation and contact channels';
  };
  attributes: {
    kicker: Attribute.String;
    title: Attribute.String;
    text: Attribute.Text;
    phone_label_1: Attribute.String;
    phone_value_1: Attribute.String;
    phone_href_1: Attribute.String;
    phone_label_2: Attribute.String;
    phone_value_2: Attribute.String;
    phone_href_2: Attribute.String;
    back_label: Attribute.String;
    back_href: Attribute.String;
    contact_label: Attribute.String;
    contact_href: Attribute.String;
  };
}

export interface SectionsTestimonialsGroup extends Schema.Component {
  collectionName: 'components_slices_testimonials_groups';
  info: {
    name: 'TestimonialsGroup';
    displayName: 'Testimonials group';
    icon: 'user-friends';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    testimonials: Attribute.Component<'elements.testimonial', true>;
  };
}

export interface SectionsShowcase extends Schema.Component {
  collectionName: 'components_sections_showcase';
  info: {
    displayName: 'Showcase Video & Tiles';
    icon: 'play-circle';
    description: 'Showcase video banner and exploration tiles';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    showcase_video: Attribute.Media<'videos' | 'files'>;
    video_url: Attribute.String;
    tiles: Attribute.Component<'elements.showcase-tile', true>;
  };
}

export interface SectionsSearchFilter extends Schema.Component {
  collectionName: 'components_sections_search_filters';
  info: {
    displayName: 'Property Search & Filters';
    icon: 'search';
    description: 'Property search drawer, placeholder and filters';
  };
  attributes: {
    title: Attribute.String;
    kicker: Attribute.String;
    submit_label: Attribute.String;
    results_path: Attribute.String;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: 'components_sections_rich_texts';
  info: {
    name: 'RichText';
    displayName: 'Rich text';
    icon: 'text-height';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsRelatedLinks extends Schema.Component {
  collectionName: 'components_sections_related_links';
  info: {
    displayName: 'Related Links (Continue)';
    icon: 'directions';
    description: 'Bottom exploration and continue cards';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'elements.related-link', true>;
  };
}

export interface SectionsPropertyOverview extends Schema.Component {
  collectionName: 'components_sections_property_overviews';
  info: {
    displayName: 'Property Overview';
    icon: 'file-text';
    description: 'Property project overview, lede, and key facts list';
  };
  attributes: {
    eyebrow: Attribute.String;
    title: Attribute.String;
    lede: Attribute.Text;
    key_facts_label: Attribute.String;
    key_facts: Attribute.Component<'elements.property-fact', true>;
  };
}

export interface SectionsPropertyLocation extends Schema.Component {
  collectionName: 'components_sections_property_locations';
  info: {
    displayName: 'Property Location';
    icon: 'pin';
    description: 'Property map coordinates and neighbourhood places';
  };
  attributes: {
    eyebrow: Attribute.String;
    map_title: Attribute.String;
    open_url: Attribute.String;
    open_label: Attribute.String;
    latitude: Attribute.String;
    longitude: Attribute.String;
  };
}

export interface SectionsPropertyHighlights extends Schema.Component {
  collectionName: 'components_sections_property_highlights';
  info: {
    displayName: 'Property Highlights';
    icon: 'star';
    description: 'Property highlight cards with title, text, and media images';
  };
  attributes: {
    eyebrow: Attribute.String;
    items: Attribute.Component<'elements.property-highlight', true>;
  };
}

export interface SectionsPropertyGallery extends Schema.Component {
  collectionName: 'components_sections_property_galleries';
  info: {
    displayName: 'Property Gallery';
    icon: 'picture';
    description: 'Property photography gallery';
  };
  attributes: {
    eyebrow: Attribute.String;
    title: Attribute.String;
    text: Attribute.Text;
    images: Attribute.Media<'images', true>;
  };
}

export interface SectionsPropertyDetail extends Schema.Component {
  collectionName: 'components_sections_property_details';
  info: {
    displayName: 'Property Detail';
    icon: 'building';
    description: 'Property hero banner, title, RERA disclaimers, and brochure/floorplan downloads';
  };
  attributes: {
    title: Attribute.String;
    kicker: Attribute.String;
    eyebrow: Attribute.String;
    lede: Attribute.Text;
    disclaimer: Attribute.Text;
    hero_image: Attribute.Media<'images'>;
    mobile_hero_image: Attribute.Media<'images'>;
    brochure_file: Attribute.Media<'files'>;
    floorplan_file: Attribute.Media<'files'>;
  };
}

export interface SectionsPropertyConnectivity extends Schema.Component {
  collectionName: 'components_sections_property_connectivities';
  info: {
    displayName: 'Property Connectivity';
    icon: 'globe';
    description: 'Property transit, airport and road network connectivity';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    stats: Attribute.Component<'elements.property-stat', true>;
  };
}

export interface SectionsPropertyAmenities extends Schema.Component {
  collectionName: 'components_sections_property_amenities';
  info: {
    displayName: 'Property Amenities';
    icon: 'heart';
    description: 'Property lifestyle amenities with icons and labels';
  };
  attributes: {
    eyebrow: Attribute.String;
    title: Attribute.String;
    text: Attribute.Text;
    items: Attribute.Component<'elements.property-amenity', true>;
  };
}

export interface SectionsPricing extends Schema.Component {
  collectionName: 'components_sections_pricings';
  info: {
    name: 'Pricing';
    displayName: 'Pricing';
    icon: 'dollar-sign';
  };
  attributes: {
    title: Attribute.String;
    plans: Attribute.Component<'elements.plan', true>;
  };
}

export interface SectionsPress extends Schema.Component {
  collectionName: 'components_sections_press';
  info: {
    displayName: 'Press Rail';
    icon: 'newspaper';
    description: 'Press releases and media announcements with repeatable cards';
  };
  attributes: {
    title: Attribute.String;
    kicker: Attribute.String;
    lede: Attribute.Text;
    eyebrow: Attribute.String;
    all_label: Attribute.String;
    all_href: Attribute.String;
    items: Attribute.Component<'elements.press-card', true>;
  };
}

export interface SectionsNavbar extends Schema.Component {
  collectionName: 'components_sections_navbars';
  info: {
    displayName: 'Navigation Bar';
    icon: 'bars';
    description: 'Header navigation bar links, logo, phone, WhatsApp and CTAs';
  };
  attributes: {
    logo_media: Attribute.Media<'images'>;
    logo_src: Attribute.String;
    logo_alt: Attribute.String;
    phone: Attribute.String;
    whatsapp: Attribute.String;
    cta_label: Attribute.String;
    cta_link: Attribute.String;
  };
}

export interface SectionsLegacy extends Schema.Component {
  collectionName: 'components_sections_legacy';
  info: {
    displayName: 'Legacy Stats';
    icon: 'award';
    description: 'Brand legacy, story and key achievements';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    content: Attribute.Text;
    lede: Attribute.Text;
    stats: Attribute.Component<'elements.stat-item', true>;
  };
}

export interface SectionsLeadForm extends Schema.Component {
  collectionName: 'components_sections_lead_forms';
  info: {
    name: 'Lead form';
    displayName: 'Lead form';
    icon: 'at';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    emailPlaceholder: Attribute.String;
    submitButton: Attribute.Component<'links.button'>;
    location: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SectionsLaunches extends Schema.Component {
  collectionName: 'components_sections_launches';
  info: {
    displayName: 'Launches Stack';
    icon: 'layer-group';
    description: 'Featured latest property launches with repeatable cards';
  };
  attributes: {
    title: Attribute.String;
    kicker: Attribute.String;
    lede: Attribute.Text;
    cue: Attribute.String;
    explore_label: Attribute.String;
    items: Attribute.Component<'elements.launch-card', true>;
  };
}

export interface SectionsLargeVideo extends Schema.Component {
  collectionName: 'components_slices_large_videos';
  info: {
    name: 'LargeVideo';
    displayName: 'Large video';
    icon: 'play-circle';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    video: Attribute.Media<'videos'> & Attribute.Required;
    poster: Attribute.Media<'images'>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_slices_heroes';
  info: {
    name: 'Hero';
    displayName: 'Hero Video Section';
    icon: 'play';
    description: 'Hero section with background video, mobile video, poster and headings';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    desktop_video: Attribute.Media<'videos' | 'files'>;
    mobile_video: Attribute.Media<'videos' | 'files'>;
    desktop_poster: Attribute.Media<'images'>;
    mobile_poster: Attribute.Media<'images'>;
    video_url: Attribute.String;
    mobile_video_url: Attribute.String;
    poster: Attribute.String;
  };
}

export interface SectionsHeading extends Schema.Component {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.String;
  };
}

export interface SectionsFeatures extends Schema.Component {
  collectionName: 'components_layout_features';
  info: {
    displayName: 'Features';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsFeatureRowsGroup extends Schema.Component {
  collectionName: 'components_slices_feature_rows_groups';
  info: {
    name: 'FeatureRowsGroup';
    displayName: 'Feaures row group';
    icon: 'bars';
  };
  attributes: {
    features: Attribute.Component<'elements.feature-row', true>;
  };
}

export interface SectionsFeatureColumnsGroup extends Schema.Component {
  collectionName: 'components_slices_feature_columns_groups';
  info: {
    name: 'FeatureColumnsGroup';
    displayName: 'Feature columns group';
    icon: 'star-of-life';
  };
  attributes: {
    features: Attribute.Component<'elements.feature-column', true>;
  };
}

export interface SectionsFaqSection extends Schema.Component {
  collectionName: 'components_sections_faq_sections';
  info: {
    displayName: 'FAQ Section';
    icon: 'question-circle';
    description: 'FAQ category block with expandable questions or downloadable factsheets';
  };
  attributes: {
    category_number: Attribute.String;
    nav_label: Attribute.String;
    title: Attribute.String;
    lede: Attribute.Text;
    items: Attribute.Component<'elements.faq-item', true>;
  };
}

export interface SectionsDevelopments extends Schema.Component {
  collectionName: 'components_sections_developments';
  info: {
    displayName: 'Developments Rail';
    icon: 'building';
    description: 'Developments and projects rail with repeatable cards';
  };
  attributes: {
    title: Attribute.String;
    kicker: Attribute.String;
    lede: Attribute.Text;
    all_label: Attribute.String;
    all_href: Attribute.String;
    explore_label: Attribute.String;
    items: Attribute.Component<'elements.development-card', true>;
  };
}

export interface SectionsConverse extends Schema.Component {
  collectionName: 'components_sections_converse';
  info: {
    displayName: 'Converse CTA';
    icon: 'comments';
    description: 'Call to action banner with background video and WhatsApp action';
  };
  attributes: {
    title: Attribute.String;
    lede: Attribute.Text;
    converse_video: Attribute.Media<'videos' | 'files'>;
    video_url: Attribute.String;
    cta_label: Attribute.String;
    cta_link: Attribute.String;
  };
}

export interface SectionsContactTeams extends Schema.Component {
  collectionName: 'components_sections_contact_teams';
  info: {
    displayName: 'Contact Teams & Enquiries';
    icon: 'user-friends';
    description: 'Specialist department teams and scam alerts';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    scam_title: Attribute.String;
    scam_text: Attribute.Text;
    items: Attribute.Component<'elements.team-contact', true>;
  };
}

export interface SectionsContactReach extends Schema.Component {
  collectionName: 'components_sections_contact_reach';
  info: {
    displayName: 'Contact Reach Options';
    icon: 'phone-volume';
    description: 'How to reach us contact channels (phone, WhatsApp, email)';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    items: Attribute.Component<'elements.contact-option', true>;
  };
}

export interface SectionsContactOffices extends Schema.Component {
  collectionName: 'components_sections_contact_offices';
  info: {
    displayName: 'Contact Offices List';
    icon: 'map-marked-alt';
    description: 'Global offices and sales centres listing';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    items: Attribute.Component<'elements.office-item', true>;
  };
}

export interface SectionsContactMasthead extends Schema.Component {
  collectionName: 'components_sections_contact_mastheads';
  info: {
    displayName: 'Contact Masthead';
    icon: 'phone';
    description: 'Contact page header and office numbers';
  };
  attributes: {
    title: Attribute.String;
    lede: Attribute.Text;
    toll_free: Attribute.String;
    international_phone: Attribute.String;
  };
}

export interface SectionsContactForm extends Schema.Component {
  collectionName: 'components_sections_contact_forms';
  info: {
    displayName: 'Contact Form Section';
    icon: 'envelope-open-text';
    description: 'Tell us what you need enquiry form configuration';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    success_title: Attribute.String;
    success_text: Attribute.Text;
  };
}

export interface SectionsCommunities extends Schema.Component {
  collectionName: 'components_sections_communities';
  info: {
    displayName: 'Communities Collage';
    icon: 'home';
    description: 'Signature communities showcase with repeatable cards';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    lede: Attribute.Text;
    intro_kicker: Attribute.String;
    intro_cue: Attribute.String;
    all_label: Attribute.String;
    all_href: Attribute.String;
    discover_label: Attribute.String;
    items: Attribute.Component<'elements.community-card', true>;
  };
}

export interface SectionsBottomActions extends Schema.Component {
  collectionName: 'components_slices_bottom_actions';
  info: {
    name: 'BottomActions';
    displayName: 'Bottom actions';
    icon: 'angle-double-right';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    buttons: Attribute.Component<'links.button-link', true>;
    description: Attribute.Text;
  };
}

export interface SectionsAboutResponsibility extends Schema.Component {
  collectionName: 'components_sections_about_responsibilities';
  info: {
    displayName: 'About Governance & ESG';
    icon: 'hand-holding-heart';
    description: 'Governance, sustainability and Emaar foundation';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'elements.responsibility-item', true>;
  };
}

export interface SectionsAboutRecord extends Schema.Component {
  collectionName: 'components_sections_about_records';
  info: {
    displayName: 'About Track Record';
    icon: 'trophy';
    description: 'Milestone delivery metrics and landmark destinations';
  };
  attributes: {
    title: Attribute.String;
    note: Attribute.String;
    stats: Attribute.Component<'elements.record-stat', true>;
    split_title: Attribute.String;
    split_text: Attribute.Text;
    split_image: Attribute.Media<'images'>;
    split_cta_label: Attribute.String;
    split_cta_href: Attribute.String;
  };
}

export interface SectionsAboutMasthead extends Schema.Component {
  collectionName: 'components_sections_about_mastheads';
  info: {
    displayName: 'About Masthead';
    icon: 'info-circle';
    description: 'About page header and overview narrative';
  };
  attributes: {
    title: Attribute.String;
    lede: Attribute.Text;
    note: Attribute.String;
  };
}

export interface SectionsAboutLeadership extends Schema.Component {
  collectionName: 'components_sections_about_leaderships';
  info: {
    displayName: 'About Leadership';
    icon: 'user-tie';
    description: 'Leadership tier cards (Board of Directors, Principal Officers)';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'elements.leadership-card', true>;
  };
}

export interface SectionsAboutInternational extends Schema.Component {
  collectionName: 'components_sections_about_internationals';
  info: {
    displayName: 'About International Presence';
    icon: 'globe';
    description: 'Global presence countries and domain links';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    items: Attribute.Component<'elements.country-item', true>;
  };
}

export interface SectionsAboutFounder extends Schema.Component {
  collectionName: 'components_sections_about_founders';
  info: {
    displayName: 'About Founder';
    icon: 'user-check';
    description: 'Founder photo, quote, role and founder message link';
  };
  attributes: {
    name: Attribute.String;
    role: Attribute.String;
    quote: Attribute.Text;
    caption: Attribute.String;
    image: Attribute.Media<'images'>;
    action_label: Attribute.String;
    action_href: Attribute.String;
  };
}

export interface SectionsAboutBusinesses extends Schema.Component {
  collectionName: 'components_sections_about_businesses';
  info: {
    displayName: 'About Our Businesses';
    icon: 'briefcase';
    description: 'Business verticals cards (Hospitality, Retail, Destination, Leisure)';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'elements.business-card', true>;
  };
}

export interface SectionsAboutAwards extends Schema.Component {
  collectionName: 'components_sections_about_awards';
  info: {
    displayName: 'About Featured Awards';
    icon: 'award';
    description: 'Featured recognition and award list';
  };
  attributes: {
    title: Attribute.String;
    cta_label: Attribute.String;
    cta_href: Attribute.String;
    items: Attribute.Component<'elements.award-item', true>;
  };
}

export interface MetaMetadata extends Schema.Component {
  collectionName: 'components_meta_metadata';
  info: {
    name: 'Metadata';
    displayName: 'Metadata';
    icon: 'robot';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface LinksSocialLink extends Schema.Component {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'Social Link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
    social: Attribute.Enumeration<['YOUTUBE', 'TWITTER', 'DISCORD', 'WEBSITE']>;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    name: 'Link';
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
  };
}

export interface LinksButton extends Schema.Component {
  collectionName: 'components_links_simple_buttons';
  info: {
    name: 'Button';
    displayName: 'Button';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: 'components_links_buttons';
  info: {
    name: 'Button-link';
    displayName: 'Button link';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    name: 'Navbar';
    displayName: 'Navbar';
    icon: 'map-signs';
    description: '';
  };
  attributes: {
    links: Attribute.Component<'links.link', true>;
    button: Attribute.Component<'links.button-link'>;
    navbarLogo: Attribute.Component<'layout.logo'>;
  };
}

export interface LayoutLogo extends Schema.Component {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logoImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    logoText: Attribute.String;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    footerLogo: Attribute.Component<'layout.logo'>;
    menuLinks: Attribute.Component<'links.link', true>;
    legalLinks: Attribute.Component<'links.link', true>;
    socialLinks: Attribute.Component<'links.social-link', true>;
    categories: Attribute.Relation<
      'layout.footer',
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface ElementsTestimonial extends Schema.Component {
  collectionName: 'components_slices_testimonials';
  info: {
    name: 'Testimonial';
    displayName: 'Testimonial';
    icon: 'user-check';
    description: '';
  };
  attributes: {
    picture: Attribute.Media<'images'> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    authorName: Attribute.String & Attribute.Required;
  };
}

export interface ElementsTeamContact extends Schema.Component {
  collectionName: 'components_elements_team_contacts';
  info: {
    displayName: 'Team Contact';
    icon: 'users';
    description: 'Specialist department contact card';
  };
  attributes: {
    category: Attribute.String;
    title: Attribute.String;
    text: Attribute.Text;
    email: Attribute.String;
    href: Attribute.String;
  };
}

export interface ElementsStatItem extends Schema.Component {
  collectionName: 'components_elements_stat_items';
  info: {
    displayName: 'Stat Item';
    icon: 'chart-bar';
    description: 'Key milestone or numerical achievement statistic';
  };
  attributes: {
    label: Attribute.String;
    value: Attribute.String;
    suffix: Attribute.String;
    prefix: Attribute.String;
  };
}

export interface ElementsShowcaseTile extends Schema.Component {
  collectionName: 'components_elements_showcase_tiles';
  info: {
    displayName: 'Showcase Tile';
    icon: 'images';
    description: 'Category or destination tile with image and link';
  };
  attributes: {
    label: Attribute.String;
    href: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

export interface ElementsResponsibilityItem extends Schema.Component {
  collectionName: 'components_elements_responsibility_items';
  info: {
    displayName: 'Responsibility Item';
    icon: 'hand-holding-heart';
    description: 'Governance and ESG responsibility card';
  };
  attributes: {
    label: Attribute.String;
    text: Attribute.Text;
    href: Attribute.String;
  };
}

export interface ElementsRelatedLink extends Schema.Component {
  collectionName: 'components_elements_related_links';
  info: {
    displayName: 'Related Link';
    icon: 'link';
    description: 'Navigation link card to other sections or pages';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    href: Attribute.String;
  };
}

export interface ElementsRecordStat extends Schema.Component {
  collectionName: 'components_elements_record_stats';
  info: {
    displayName: 'Record Stat';
    icon: 'trophy';
    description: 'Milestone delivery statistic item';
  };
  attributes: {
    value: Attribute.String;
    text: Attribute.Text;
    source: Attribute.String;
  };
}

export interface ElementsPropertyStat extends Schema.Component {
  collectionName: 'components_elements_property_stats';
  info: {
    displayName: 'Property Stat';
    icon: 'clock';
  };
  attributes: {
    icon: Attribute.String;
    value: Attribute.String;
    label: Attribute.String;
    subtext: Attribute.String;
  };
}

export interface ElementsPropertyHighlight extends Schema.Component {
  collectionName: 'components_elements_property_highlights';
  info: {
    displayName: 'Property Highlight';
    icon: 'star';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.Text;
    image: Attribute.Media<'images'>;
  };
}

export interface ElementsPropertyFact extends Schema.Component {
  collectionName: 'components_elements_property_facts';
  info: {
    displayName: 'Property Fact';
    icon: 'check';
  };
  attributes: {
    icon: Attribute.String;
    text: Attribute.String;
  };
}

export interface ElementsPropertyAmenity extends Schema.Component {
  collectionName: 'components_elements_property_amenities';
  info: {
    displayName: 'Property Amenity';
    icon: 'heart';
  };
  attributes: {
    icon: Attribute.String;
    label: Attribute.String;
  };
}

export interface ElementsPressCard extends Schema.Component {
  collectionName: 'components_elements_press_cards';
  info: {
    displayName: 'Press Card';
    icon: 'newspaper';
    description: 'Press release or news card';
  };
  attributes: {
    title: Attribute.String;
    date: Attribute.String;
    slug: Attribute.String;
    href: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

export interface ElementsPlan extends Schema.Component {
  collectionName: 'components_elements_plans';
  info: {
    name: 'plan';
    displayName: 'Pricing plan';
    icon: 'search-dollar';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    isRecommended: Attribute.Boolean;
    price: Attribute.Decimal;
    pricePeriod: Attribute.String;
    product_features: Attribute.Relation<
      'elements.plan',
      'oneToMany',
      'api::product-feature.product-feature'
    >;
  };
}

export interface ElementsOfficeItem extends Schema.Component {
  collectionName: 'components_elements_office_items';
  info: {
    displayName: 'Office Item';
    icon: 'building';
    description: 'Office or sales centre location card';
  };
  attributes: {
    country: Attribute.String;
    city: Attribute.String;
    region: Attribute.String;
    address: Attribute.Text;
    phone: Attribute.String;
    phone_href: Attribute.String;
    hours: Attribute.String;
  };
}

export interface ElementsNotificationBanner extends Schema.Component {
  collectionName: 'components_elements_notification_banners';
  info: {
    name: 'NotificationBanner';
    displayName: 'Notification banner';
    icon: 'exclamation';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['alert', 'info', 'warning']> &
      Attribute.Required;
    heading: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    show: Attribute.Boolean & Attribute.DefaultTo<false>;
    link: Attribute.Component<'links.link'>;
  };
}

export interface ElementsLogos extends Schema.Component {
  collectionName: 'components_elements_logos';
  info: {
    name: 'logos';
    displayName: 'Logos';
    icon: 'apple-alt';
  };
  attributes: {
    title: Attribute.String;
    logo: Attribute.Media<'images'>;
  };
}

export interface ElementsLeadershipCard extends Schema.Component {
  collectionName: 'components_elements_leadership_cards';
  info: {
    displayName: 'Leadership Card';
    icon: 'user-tie';
    description: 'Leadership tier card with tag and title';
  };
  attributes: {
    tag: Attribute.String;
    title: Attribute.String;
    href: Attribute.String;
  };
}

export interface ElementsLaunchCard extends Schema.Component {
  collectionName: 'components_elements_launch_cards';
  info: {
    displayName: 'Launch Card';
    icon: 'rocket';
    description: 'Featured launch card with image and video preview';
  };
  attributes: {
    name: Attribute.String;
    city: Attribute.String;
    type: Attribute.String;
    config: Attribute.String;
    slug: Attribute.String;
    href: Attribute.String;
    image: Attribute.Media<'images'>;
    video: Attribute.Media<'videos'>;
  };
}

export interface ElementsFooterSection extends Schema.Component {
  collectionName: 'components_links_footer_sections';
  info: {
    name: 'FooterSection';
    displayName: 'Footer section';
    icon: 'chevron-circle-down';
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<'links.link', true>;
  };
}

export interface ElementsFeature extends Schema.Component {
  collectionName: 'components_elements_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    showLink: Attribute.Boolean & Attribute.DefaultTo<false>;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    url: Attribute.String;
    text: Attribute.String;
  };
}

export interface ElementsFeatureRow extends Schema.Component {
  collectionName: 'components_slices_feature_rows';
  info: {
    name: 'FeatureRow';
    displayName: 'Feature row';
    icon: 'arrows-alt-h';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    media: Attribute.Media<'images' | 'videos'> & Attribute.Required;
    link: Attribute.Component<'links.link'>;
  };
}

export interface ElementsFeatureColumn extends Schema.Component {
  collectionName: 'components_slices_feature_columns';
  info: {
    name: 'FeatureColumn';
    displayName: 'Feature column';
    icon: 'align-center';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Media<'images'> & Attribute.Required;
  };
}

export interface ElementsFaqItem extends Schema.Component {
  collectionName: 'components_elements_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
    description: 'Question and answer pair or downloadable factsheet item';
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.Text;
    file_title: Attribute.String;
    file_href: Attribute.String;
  };
}

export interface ElementsDevelopmentCard extends Schema.Component {
  collectionName: 'components_elements_development_cards';
  info: {
    displayName: 'Development Card';
    icon: 'building';
    description: 'Card item for developments and projects rail';
  };
  attributes: {
    name: Attribute.String;
    city: Attribute.String;
    type: Attribute.String;
    slug: Attribute.String;
    href: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

export interface ElementsCountryItem extends Schema.Component {
  collectionName: 'components_elements_country_items';
  info: {
    displayName: 'Country Item';
    icon: 'globe';
    description: 'International presence country and domain link';
  };
  attributes: {
    name: Attribute.String;
    domain: Attribute.String;
    href: Attribute.String;
  };
}

export interface ElementsContactOption extends Schema.Component {
  collectionName: 'components_elements_contact_options';
  info: {
    displayName: 'Contact Option';
    icon: 'phone';
    description: 'Reach-out channel option (phone, WhatsApp, email, enquiry)';
  };
  attributes: {
    icon: Attribute.String;
    label: Attribute.String;
    value: Attribute.String;
    note: Attribute.String;
    href: Attribute.String;
  };
}

export interface ElementsCommunityCard extends Schema.Component {
  collectionName: 'components_elements_community_cards';
  info: {
    displayName: 'Community Card';
    icon: 'home';
    description: 'Signature community card with image, video and details';
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.String;
    href: Attribute.String;
    tagline: Attribute.String;
    blurb: Attribute.Text;
    image: Attribute.Media<'images'>;
    video: Attribute.Media<'videos'>;
  };
}

export interface ElementsBusinessCard extends Schema.Component {
  collectionName: 'components_elements_business_cards';
  info: {
    displayName: 'Business Card';
    icon: 'briefcase';
    description: 'Business vertical card with image and link';
  };
  attributes: {
    tag: Attribute.String;
    title: Attribute.String;
    href: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

export interface ElementsAwardItem extends Schema.Component {
  collectionName: 'components_elements_award_items';
  info: {
    displayName: 'Award Item';
    icon: 'award';
    description: 'Featured recognition or award item';
  };
  attributes: {
    title: Attribute.String;
    by: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.video-embed': SharedVideoEmbed;
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.media': SharedMedia;
      'sections.thank-you': SectionsThankYou;
      'sections.testimonials-group': SectionsTestimonialsGroup;
      'sections.showcase': SectionsShowcase;
      'sections.search-filter': SectionsSearchFilter;
      'sections.rich-text': SectionsRichText;
      'sections.related-links': SectionsRelatedLinks;
      'sections.property-overview': SectionsPropertyOverview;
      'sections.property-location': SectionsPropertyLocation;
      'sections.property-highlights': SectionsPropertyHighlights;
      'sections.property-gallery': SectionsPropertyGallery;
      'sections.property-detail': SectionsPropertyDetail;
      'sections.property-connectivity': SectionsPropertyConnectivity;
      'sections.property-amenities': SectionsPropertyAmenities;
      'sections.pricing': SectionsPricing;
      'sections.press': SectionsPress;
      'sections.navbar': SectionsNavbar;
      'sections.legacy': SectionsLegacy;
      'sections.lead-form': SectionsLeadForm;
      'sections.launches': SectionsLaunches;
      'sections.large-video': SectionsLargeVideo;
      'sections.hero': SectionsHero;
      'sections.heading': SectionsHeading;
      'sections.features': SectionsFeatures;
      'sections.feature-rows-group': SectionsFeatureRowsGroup;
      'sections.feature-columns-group': SectionsFeatureColumnsGroup;
      'sections.faq-section': SectionsFaqSection;
      'sections.developments': SectionsDevelopments;
      'sections.converse': SectionsConverse;
      'sections.contact-teams': SectionsContactTeams;
      'sections.contact-reach': SectionsContactReach;
      'sections.contact-offices': SectionsContactOffices;
      'sections.contact-masthead': SectionsContactMasthead;
      'sections.contact-form': SectionsContactForm;
      'sections.communities': SectionsCommunities;
      'sections.bottom-actions': SectionsBottomActions;
      'sections.about-responsibility': SectionsAboutResponsibility;
      'sections.about-record': SectionsAboutRecord;
      'sections.about-masthead': SectionsAboutMasthead;
      'sections.about-leadership': SectionsAboutLeadership;
      'sections.about-international': SectionsAboutInternational;
      'sections.about-founder': SectionsAboutFounder;
      'sections.about-businesses': SectionsAboutBusinesses;
      'sections.about-awards': SectionsAboutAwards;
      'meta.metadata': MetaMetadata;
      'links.social-link': LinksSocialLink;
      'links.link': LinksLink;
      'links.button': LinksButton;
      'links.button-link': LinksButtonLink;
      'layout.navbar': LayoutNavbar;
      'layout.logo': LayoutLogo;
      'layout.footer': LayoutFooter;
      'elements.testimonial': ElementsTestimonial;
      'elements.team-contact': ElementsTeamContact;
      'elements.stat-item': ElementsStatItem;
      'elements.showcase-tile': ElementsShowcaseTile;
      'elements.responsibility-item': ElementsResponsibilityItem;
      'elements.related-link': ElementsRelatedLink;
      'elements.record-stat': ElementsRecordStat;
      'elements.property-stat': ElementsPropertyStat;
      'elements.property-highlight': ElementsPropertyHighlight;
      'elements.property-fact': ElementsPropertyFact;
      'elements.property-amenity': ElementsPropertyAmenity;
      'elements.press-card': ElementsPressCard;
      'elements.plan': ElementsPlan;
      'elements.office-item': ElementsOfficeItem;
      'elements.notification-banner': ElementsNotificationBanner;
      'elements.logos': ElementsLogos;
      'elements.leadership-card': ElementsLeadershipCard;
      'elements.launch-card': ElementsLaunchCard;
      'elements.footer-section': ElementsFooterSection;
      'elements.feature': ElementsFeature;
      'elements.feature-row': ElementsFeatureRow;
      'elements.feature-column': ElementsFeatureColumn;
      'elements.faq-item': ElementsFaqItem;
      'elements.development-card': ElementsDevelopmentCard;
      'elements.country-item': ElementsCountryItem;
      'elements.contact-option': ElementsContactOption;
      'elements.community-card': ElementsCommunityCard;
      'elements.business-card': ElementsBusinessCard;
      'elements.award-item': ElementsAwardItem;
    }
  }
}
