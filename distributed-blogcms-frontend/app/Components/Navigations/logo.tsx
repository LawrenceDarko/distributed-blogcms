import Image from 'next/image';

const Logo = () => {
    return (
        <div>
            <Image
                height={70}
                width={70}
                alt='logo'
                src='/images/logo.png'
            />
        </div>
    )
}

export default Logo