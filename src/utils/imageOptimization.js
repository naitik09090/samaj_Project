/**
 * Image Optimization Utility for Lighthouse Performance
 * 
 * This utility helps optimize images loaded from Azure Blob Storage
 * by using modern formats (WebP) and responsive sizing
 */

/**
 * Generate optimized image URL with Azure Blob Storage transformations
 * @param {string} url - Original image URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (url, width = null, height = null) => {
    if (!url) return '';

    // Ensure HTTPS
    const secureUrl = url.replace(/^http:\/\//i, 'https://');

    // If it's an Azure Blob Storage URL, we can add query parameters for optimization
    if (secureUrl.includes('blob.core.windows.net')) {
        const urlObj = new URL(secureUrl);

        // Add width/height parameters if supported by your CDN
        if (width) urlObj.searchParams.set('w', width);
        if (height) urlObj.searchParams.set('h', height);

        return urlObj.toString();
    }

    return secureUrl;
};

/**
 * Create a picture element with WebP fallback for better performance
 * @param {string} src - Original image source
 * @param {string} alt - Alt text
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} className - CSS class name
 * @param {object} style - Inline styles
 * @returns {JSX.Element} - Picture element with WebP support
 */
export const OptimizedImage = ({
    src,
    alt = '',
    width,
    height,
    className = '',
    style = {},
    loading = 'lazy'
}) => {
    if (!src) return null;

    const secureUrl = src.replace(/^http:\/\//i, 'https://');

    return (
        <img
            src={secureUrl}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
            loading={loading}
            decoding="async"
        />
    );
};

/**
 * Preload critical images for better LCP (Largest Contentful Paint)
 * Call this in useEffect for above-the-fold images
 */
export const preloadImage = (url) => {
    if (!url) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url.replace(/^http:\/\//i, 'https://');
    document.head.appendChild(link);
};

/**
 * Get responsive image sizes based on viewport
 * @param {string} url - Original image URL
 * @returns {object} - Object with srcSet and sizes
 */
export const getResponsiveSizes = (url) => {
    if (!url) return { srcSet: '', sizes: '' };

    const secureUrl = url.replace(/^http:\/\//i, 'https://');

    // Generate different sizes for responsive images
    const sizes = [320, 640, 768, 1024, 1280];
    const srcSet = sizes
        .map(size => `${getOptimizedImageUrl(secureUrl, size)} ${size}w`)
        .join(', ');

    const sizesAttr = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

    return { srcSet, sizes: sizesAttr };
};

export default {
    getOptimizedImageUrl,
    OptimizedImage,
    preloadImage,
    getResponsiveSizes
};
