// Google Translate initialization function
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'es', // Default language is Spanish
            includedLanguages: 'es,en,pt', // Spanish, English, Portuguese
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
        },
        'google_translate_element'
    );
}
