import Link from 'next/link'
import Image from 'next/image'
import logoImage from '../public/logo.png'
import styles from '../styles/navbar/Navbar.module.css'
import profileImage from '../public/profileImage.png'

const Logo = () => {
    return (
        <Link href={'/'}>
            <Image src={logoImage} alt={'logo'} width={194} height={24}/>
        </Link>
    )
}

const LinkItem = ({path, href, children}) => {
    const activeItem = path === href

    return (
        <Link href={href} className={activeItem ? `${styles.linkItem} ${styles.activeLink}` : styles.linkItem}>
            {children}
        </Link>)
}

export const Navbar = (props) => {
    const {path} = props

    return (
        <div className={styles.navbar}>
            <div className={styles.leftPart}>
                <Logo/>
                <div className={styles.links}>
                    <LinkItem path={path} href={'/map'}>
                        Гео-платформа
                    </LinkItem>
                    <LinkItem path={path} href={'/panel'}>
                        Обзорная панель
                    </LinkItem>
                </div>
            </div>
            <div className={styles.rightPart}>
                <Image src={profileImage} alt={'profile image'} width={40} height={40}/>
                <div className={styles.rightPartText}>
                    <h3>Сергей Петров</h3>
                    <Link href={'/office'} className={styles.officeLink}>
                        Личный кабинет
                    </Link>
                </div>
            </div>
        </div>
    )
}