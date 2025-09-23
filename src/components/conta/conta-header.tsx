'use client';

import React from 'react'
import FeedIcon from '@/icons/feed-icon';
import EstatisticasIcon from '@/icons/estatisticas-icon';
import AdicionarIcon from '@/icons/adicionar-icon';
import SairIcon from '@/icons/sair-icon';
import styles from './conta-header.module.css'
import UseMedia from '@/hooks/use-media'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function getTitle(pathname: string) {
    switch(pathname) {
        case '/conta/postar':
            return 'Poste sua Foto';
        case '/conta/estatistica':
            return 'Estatísticas';
        default:
            return 'Minha Conta';
    }
}

export default function ContaHeader() {
    const mobile = UseMedia('(max-width: 40rem)')
    const [mobileMenu, setMobileMenu] = React.useState(false)

    const pathname = usePathname();
    React.useEffect(() => {
        setMobileMenu(false)
    },[pathname])

    function handleLogout() {
        // userLogout()
    }

    return (
        <header className={styles.header}>
            <h1 className='title'>{getTitle(pathname)}</h1>
            {mobile &&
                <button aria-label='Menu'
                className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive} `}
                 onClick={() => setMobileMenu(!mobileMenu)}>   
                 </button>
            }

            <nav className={`${ mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive} `}>
                <Link href='/conta' className={pathname === '/conta' ? 'active' : ''}>
                    < FeedIcon />
                    {mobile && 'Minhas Fotos'}
                </Link>

                <Link href='/conta/estatisticas' className={pathname === '/conta/estatisticas' ? 'active' : ''}>
                    <EstatisticasIcon />
                    {mobile && 'Estatisticas'}
                </Link>

                <Link href='/conta/postar' className={pathname === '/conta/postar' ? 'active' : ''} >
                    <AdicionarIcon />
                    {mobile && 'Adicionar Fotos'}
                </Link>
                <button onClick={handleLogout}>
                    < SairIcon />
                    {mobile && 'Sair'}
                </button>
            </nav>
        </header>
    )
}
