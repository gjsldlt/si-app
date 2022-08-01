import styles from './pageBanner.module.scss';

export default function PageBanner({ bgImage, title, content }: PageProps) {
  const tailwindClasses = {
    container: `w-full pt-header-height h-[275px] bg-staticBanner bg-no-repeat bg-center bg-cover text-white absolute top-0`,
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
  content?: any
}
