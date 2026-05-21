import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND_CONFIG } from '@/lib/config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website' 
}) => {
  const siteName = BRAND_CONFIG.name;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = BRAND_CONFIG.description;
  const defaultKeywords = BRAND_CONFIG.seo.keywords;
  const defaultImage = BRAND_CONFIG.seo.image;
  const siteUrl = window.location.origin;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Canonical Link */}
      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
};

export default SEO;
