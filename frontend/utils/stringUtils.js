export function uriToTitle(uri) {
    const encodedTitle = decodeURIComponent(uri.replace('/genre/', ''));
    const originalTitle = encodedTitle.replace(/_/g, ' ').replace(/and/g, '&');
    return originalTitle.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function sanitizedUri(uri) {
    const sanitizedTitle = uri.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const truncatedTitle = sanitizedTitle.substring(0, 300);
    const convertedTitle = truncatedTitle.replace(/&/g, 'and');
    const finalSlug = convertedTitle.replace(/^-+|-+$/g, '');
    return encodeURIComponent(finalSlug);
}

export function removeHyphensAndTitleCase(input) {
    const words = input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const result = words.join(' ');
    return result;
  }
  

export function navigateToBook(title, id) {
    return '/book/' + encodeURIComponent(title) + '/' + id;
}

export function truncateText(text, maxLength) {
    const convertedText = convertUnicode(text)
    if (convertedText && convertedText.length > maxLength) {
        return convertedText.slice(0, maxLength - 3) + "...";
    }
    return convertedText;
}

export function convertUnicode(input) {
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) => String.fromCharCode(parseInt(b, 16)));
}

export function convertToTitleCase(str) {
    if (!str) {
        return ""
    }
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}