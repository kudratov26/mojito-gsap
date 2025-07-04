
import { useRef, useState } from 'react';
import { allCocktails } from '../../constants/index.ts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const Menu = () => {
    //@ts-expect-error everything is good
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0)

    useGSAP(() => {
        gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 })
        gsap.fromTo(".cocktail img", { opacity: 0, xPercent: -80 }, { opacity: 1, duration: 0.8, xPercent: 0, ease: 'power1.inOut' })
        gsap.fromTo(".details h2", { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, ease: 'power1.inOut' })
        gsap.fromTo(".details p", { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, ease: 'power1.inOut' })

    }, [currentIndex])



    const totalCocktails = allCocktails.length;
    //@ts-expect-error everything is good
    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;

        setCurrentIndex(newIndex);
    }
    //@ts-expect-error everything is good
    const getCocktailAt = (indexOffset) => {
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);
    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img id="m-left-leaf" src="/images/slider-left-leaf.png" alt="" />
            <img id="m-right-leaf" src="/images/slider-right-leaf.png" alt="" />
            <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>
            <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                {allCocktails.map((cocktail, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <button key={cocktail.id} className={`
				${isActive
                                ? 'text-white border-white'
                                : 'text-white/50 border-white/50'}
			 `} onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>
            <div className='content'>
                <div className='arrows'>
                    <button className="text-left flex gap-4" onClick={() => goToSlide(currentIndex - 1)}>
                        <img src="/images/right-arrow.png" alt="" aria-hidden='true' />
                        <span>{prevCocktail.name}</span>
                    </button>
                    <button className="text-right flex gap-4" onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="" aria-hidden='true' />
                    </button>
                </div>
                <div className='cocktail'>
                    <img src={`${currentCocktail.image}`} alt="" />
                </div>
                <div className="recipe">
                    {/* @ts-expect-error everything is good */}
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Menu