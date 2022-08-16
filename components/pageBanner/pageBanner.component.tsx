import styles from './pageBanner.module.scss';

export default function PageBanner({ bgImage, title, content, height }: PageProps) {
  const hbanner = `h-[${height.length>0 ? height : '40vh'}]`
  const tailwindClasses = {
    container: `w-full pt-header-height ${hbanner} bg-staticBanner bg-no-repeat bg-center bg-cover text-white sticky md:absolute top-0 z-[2]`,
    backdrop: 'absolute h-full w-full bg-[rgba(0,0,0,0.2)] top-0 z-[1]',
  }

  const renderContent = () => {
    if (content)
      return content;
    else false
  }

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.backdrop} />
      {
        renderContent() || (
          <div>
            {title}
          </div>
        )
      }
    </div>
  )
}

type PageProps = {
  bgImage?: String,
  title?: String,
  content?: any,
  height: string,
}

PageBanner.defaultProps = {
  height: ''
}