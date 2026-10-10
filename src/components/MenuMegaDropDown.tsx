import './MenuMegaDropDown.css'

type MenuMegaDropDownProps = {
  isOpen: boolean
  onPointerEnter: () => void
  onPointerLeave: () => void
  onNavigate: (path: string) => void
}

type MenuCategoryData = {
  name: string
  megaIcon: string
  targetId: string
}

const megaIcons = import.meta.glob<string>('../assets/MenuMegaDropDown icons/*.png', { eager: true, query: '?url', import: 'default' })

const menuColumns: { title: string; categories: MenuCategoryData[] }[] = [
  {
    title: 'FEATURED & BURGERS',
    categories: [
      { name: 'Featured', megaIcon: 'Featured.png', targetId: 'featured' },
      { name: 'Group Meals', megaIcon: 'Group meals.png', targetId: 'group-meals' },
      { name: 'King Savings Bundles', megaIcon: 'TB Savers Bundles.png', targetId: 'tb-savers' },
      { name: 'Whopper', megaIcon: 'Whopper.png', targetId: 'whopper' },
      { name: '4-Cheese Whopper', megaIcon: '4-Cheese Whopper.png', targetId: 'four-cheese-whopper' },
      { name: 'Plant-Based Whopper', megaIcon: 'Plant-Based Whopper.png', targetId: 'plant-based-whopper' },
    ],
  },
  {
    title: 'CHICKEN & CLASSICS',
    categories: [
      { name: 'All-Day Breakfast', megaIcon: 'All-day breakfast.png', targetId: 'all-day-breakfast' },
      { name: 'Chicken', megaIcon: 'TB king.png', targetId: 'tb-chicken-burger' },
      { name: 'X-tra Long Chicken', megaIcon: 'X-tra Long Chicken.png', targetId: 'xtra-long-chicken' },
      { name: 'Flame-Grilled Cheeseburger', megaIcon: 'Flame-Grilled Cheeseburger.png', targetId: 'flame-grilled' },
      { name: 'TB Special', megaIcon: 'TB Special.png', targetId: 'tb-special' },
    ],
  },
  {
    title: 'SIDES & SIPS',
    categories: [
      { name: 'Chicken Rice Meals', megaIcon: 'Chicken Rice Meals.png', targetId: 'chicken-rice-meals' },
      { name: 'Ultimate Side Kicks', megaIcon: 'Ultimate Side Kicks.png', targetId: 'ultimate-side-kicks' },
      { name: 'Café', megaIcon: 'TB Cafe.png', targetId: 'tb-cafe' },
      { name: 'Drinks', megaIcon: 'Drinks.png', targetId: 'drinks' },
      { name: 'Desserts', megaIcon: 'Desserts.png', targetId: 'desserts' },
    ],
  },
]

function assetUrl(assets: Record<string, string>, filename: string) {
  return Object.entries(assets).find(([assetPath]) => assetPath.endsWith(`/${filename}`))?.[1]
}

function MenuMegaDropDown({ isOpen, onPointerEnter, onPointerLeave, onNavigate }: MenuMegaDropDownProps) {
  return <div className={`mega-menu-panel${isOpen ? ' open' : ''}`} aria-hidden={!isOpen} onMouseEnter={onPointerEnter} onMouseLeave={onPointerLeave}>
    <div className="mega-menu-grid">
      {menuColumns.map((column) => <section className="mega-menu-section" key={column.title}>
        <h2>{column.title}</h2>
        <div className="mega-menu-categories">
          {column.categories.map((category) => {
            const categoryIcon = assetUrl(megaIcons, category.megaIcon)
            return <button className="mega-menu-category" key={category.name} tabIndex={isOpen ? 0 : -1} onClick={() => onNavigate(`/menu#${category.targetId}`)}>
              {categoryIcon && <img className="mega-menu-section-icon" src={categoryIcon} alt="" />}
              <span>{category.name}</span>
            </button>
          })}
        </div>
      </section>)}
    </div>
  </div>
}

export default MenuMegaDropDown