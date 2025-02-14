export default function AgentLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  console.log('Layout Rendered, Modal:', !!modal)
  return (
    <>
      {children}
      {modal}
    </>
  )
}
