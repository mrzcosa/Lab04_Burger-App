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
}

const megaIcons = import.meta.glob<string>('../assets/MenuMegaDropDown icons/*.png', { eager: true, query: '?url', import: 'default' })

const menuColumns: { title: string; categories: MenuCategoryData[] }[] = [
  {
    title: 'FEATURED & BURGERS',
    categories: [
      { name: 'Featured', megaIcon: 'Featured.png' },
      { name: 'Group Meals', megaIcon: 'Group meals.png' },
      { name: 'King Savings Bundles', megaIcon: 'TB Savers Bundles.png' },
      { name: 'Whopper', megaIcon: 'Whopper.png' },
      { name: '4-Cheese Whopper', megaIcon: '4-Cheese Whopper.png' },
      { name: 'Plant-Based Whopper', megaIcon: 'Plant-Based Whopper.png' },
    ],
  },
  {
    title: 'CHICKEN & CLASSICS',
    categories: [
      { name: 'All-Day Breakfast', megaIcon: 'All-day breakfast.png' },
      { name: 'Chicken', megaIcon: 'TB king.png' },
      { name: 'X-tra Long Chicken', megaIcon: 'X-tra Long Chicken.png' },
      { name: 'Flame-Grilled Cheeseburger', megaIcon: 'Flame-Grilled Cheeseburger.png' },
      { name: 'TB Special', megaIcon: 'TB Special.png' },
    ],
  },
  {
    title: 'SIDES & SIPS',
    categories: [
      { name: 'Chicken Rice Meals', megaIcon: 'Chicken Rice Meals.png' },
      { name: 'Steakicks', megaIcon: 'Ultimate Side Kicks.png' },
      { name: 'Café', megaIcon: 'TB Cafe.png' },
      { name: 'Drinks', megaIcon: 'Drinks.png' },
      { name: 'Desserts', megaIcon: 'Desserts.png' },
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
            return <button className="mega-menu-category" key={category.name} tabIndex={isOpen ? 0 : -1} onClick={() => onNavigate('/menu')}>
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