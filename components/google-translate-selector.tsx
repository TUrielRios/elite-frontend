"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

// Language configuration with flag emojis
const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸', googleCode: 'es' },
    { code: 'en', name: 'English', flag: '🇺🇸', googleCode: 'en' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', googleCode: 'pt' },
]

interface GoogleTranslateSelectorProps {
    isScrolled?: boolean
}

export function GoogleTranslateSelector({ isScrolled = false }: GoogleTranslateSelectorProps) {
    const [currentLang, setCurrentLang] = useState('es')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Read the current language from the googtrans cookie
        const cookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('googtrans='))

        if (cookie) {
            const value = decodeURIComponent(cookie.split('=')[1])
            // Cookie format is /es/en for English, /es/pt for Portuguese
            if (value.includes('/en')) {
                setCurrentLang('en')
            } else if (value.includes('/pt')) {
                setCurrentLang('pt')
            } else {
                setCurrentLang('es')
            }
        }
    }, [])

    const changeLanguage = (langCode: string, googleCode: string) => {
        if (langCode === 'es') {
            // Clear translation for Spanish (original)
            document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
            setCurrentLang('es')
            window.location.reload()
        } else {
            // Set translation cookie
            const cookieValue = `/es/${googleCode}`
            document.cookie = `googtrans=${cookieValue}; path=/`
            document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`
            setCurrentLang(langCode)
            window.location.reload()
        }
    }

    const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0]

    return (
        <div className="flex items-center">
            {/* Hidden div for Google Translate widget initialization */}
            <div id="google_translate_element" className="hidden"></div>

            {/* Compact dropdown button */}
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`
              gap-2 text-base font-medium transition-all
              ${isScrolled
                                ? 'text-gray-800 hover:bg-gray-100'
                                : 'text-white hover:bg-white/10'
                            }
            `}
                    >
                        <Globe className={`h-4 w-4 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
                        <span className="text-xl">{currentLanguage.flag}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                    {languages.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code, lang.googleCode)}
                            className={`
                cursor-pointer gap-2 text-base
                ${currentLang === lang.code ? 'bg-primary/10 font-semibold' : ''}
              `}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <span>{lang.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
