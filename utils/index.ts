/**
 * @description 计算滚动距离
 * @param target
 * @param parentNode
 */
export function scrollDistance(
  target: HTMLLIElement | HTMLDivElement,
  parentNode: HTMLUListElement | HTMLDivElement
) {
  if (parentNode && target) {
    const { offsetLeft, offsetWidth } = target
    parentNode.scrollLeft =
      offsetLeft - (parentNode.offsetWidth - offsetWidth) / 2
    console.log(offsetLeft - (parentNode.offsetWidth - offsetWidth) / 2)
  }
}
