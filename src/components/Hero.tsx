import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import { useMediaQuery } from "react-responsive"
import { useCallback, useRef } from "react"

const Hero = () => {

    const videoRef = useRef<HTMLVideoElement>(null)
    const lastScroll = useRef<number>(0)
    const lastDelta = useRef<number>(0)
    const timeout = useRef<NodeJS.Timeout>()
    const isMobile = useMediaQuery({ maxWidth: 767 })

    const handleScroll = useCallback(() => {
        if (!videoRef.current) return
        const currentScroll = window.pageYOffset
        const deltaY = currentScroll - lastScroll.current

        // Update video playback based on scroll
        if (Math.abs(deltaY) > 0) {
            videoRef.current.play()
            // Adjust playback speed/direction based on scroll delta
            videoRef.current.playbackRate = Math.min(Math.abs(deltaY) * 0.1, 2)
            videoRef.current.currentTime = Math.max(0, Math.min(
                videoRef.current.currentTime + (deltaY * 0.01),
                videoRef.current.duration
            ))
        }

        // Store current scroll position
        lastDelta.current = deltaY
        lastScroll.current = currentScroll

        // Clear any existing timeout
        if (timeout.current) clearTimeout(timeout.current)

        // Set timeout to pause video when scrolling stops
        timeout.current = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause()
            }
        }, 150)
    }, [])

    useGSAP(() => {
        // Set up scroll listener
        window.addEventListener('scroll', handleScroll)

        const heroSplit = new SplitText('.title', { type: 'chars, words' })
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
            delay: 1
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)
        // Cleanup scroll listener
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (timeout.current) clearTimeout(timeout.current)
        }


    }, [])

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />
                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic.</p>
                            <p className="subtitle">Sip the Spirit <br /> of Summer</p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video absolute inset-0">
                <video ref={videoRef} src="/public/videos/input.mp4" muted playsInline preload="auto" />
            </div>
        </>
    )
}

export default Hero
