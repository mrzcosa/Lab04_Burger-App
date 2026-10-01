import burger1 from '../assets/Burger 1.png'
import burger2 from '../assets/Burger 2.png'
import burger3 from '../assets/Burger 3.png'
import burger4 from '../assets/Burger 4.png'
import burger1WithFries from '../assets/Burger WFD/Burger 1/B1WF.png'
import burger1Combo from '../assets/Burger WFD/Burger 1/B1WFD.png'
import burger2WithFries from '../assets/Burger WFD/Burger 2/B2WF.png'
import burger2Combo from '../assets/Burger WFD/Burger 2/B2WFD.png'
import burger3WithFries from '../assets/Burger WFD/Burger 3/B3WF.png'
import burger3Combo from '../assets/Burger WFD/Burger 3/B3WFD.png'
import burger4WithFries from '../assets/Burger WFD/Burger 4/B4WF.png'
import burger4Combo from '../assets/Burger WFD/Burger 4/B4WFD.png'

export type Product = { id: number; name: string; description: string; price: number; rating: number; image: string }
export type BurgerVariation = { id: 'regular' | 'with-fries' | 'combo'; name: string; description: string; image: string; price: number }
export const products: Product[] = [
  { id: 1, name: 'Crispy Chicken', description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw', price: 129, rating: 5, image: burger1 },
  { id: 2, name: 'Ultimate Bacon', description: 'House patty, cheddar cheese, bacon, onion, mustard', price: 149, rating: 4.5, image: burger2 },
  { id: 3, name: 'Black Sheep', description: 'American cheese, tomato relish, avocado, lettuce, red onion', price: 159, rating: 4, image: burger3 },
  { id: 4, name: 'Vegan Burger', description: 'House patty, cheddar cheese, bacon, onion, mustard', price: 179, rating: 4.5, image: burger4 },
]
const variationImages = [[burger1WithFries, burger1Combo], [burger2WithFries, burger2Combo], [burger3WithFries, burger3Combo], [burger4WithFries, burger4Combo]]
export function getProductVariations(product: Product): BurgerVariation[] { const images = variationImages[product.id - 1] ?? variationImages[0]; return [{ id: 'regular', name: 'Regular Burger', description: 'Burger only', image: product.image, price: product.price }, { id: 'with-fries', name: 'Burger + Fries', description: 'Burger with crispy fries', image: images[0], price: product.price + 30 }, { id: 'combo', name: 'Combo Meal', description: 'Burger + fries + Coke', image: images[1], price: product.price + 50 }] }
