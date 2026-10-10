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
import groupMealFor2 from '../assets/MenuCategory/Group Meals/TB Feast Mix \'n Feast for 2.png'
import groupMealFor3 from '../assets/MenuCategory/Group Meals/TB Feast Mix \'n Feast for 3.png'
import groupMealFor4 from '../assets/MenuCategory/Group Meals/TB Feast Mix \'n Feast for 4.png'
import tbSavers199 from '../assets/MenuCategory/TB Savers Bundles/199 TB Savers Bundles.png'
import tbSavers299 from '../assets/MenuCategory/TB Savers Bundles/299 TB Savers Bundles.png'
import whopperImage from '../assets/MenuCategory/Whopper/Whopper.png'
import whopperJrImage from '../assets/MenuCategory/Whopper/Whopper Jr..png'
import fourCheeseWhopperImage from '../assets/MenuCategory/4-Cheese Whopper/4-Cheese Whopper.png'
import fourCheeseWhopperJrImage from '../assets/MenuCategory/4-Cheese Whopper/4-Cheese Whopper Jr.png'
import xtraLongChickenImage from '../assets/MenuCategory/X-tra Long Chicken/X-tra Long Chicken Sandwich.png'
import xtraLongChickenJrImage from '../assets/MenuCategory/X-tra Long Chicken/X-tra Long Chicken Jr. Sandwich.png'
import waffleSausageWithEgg from '../assets/MenuCategory/All-Day Breakfast/Waffle Sausage King with Egg.png'
import waffleSausageWithCheese from '../assets/MenuCategory/All-Day Breakfast/Waffle Sausage King with Cheese.png'
import hashBites from '../assets/MenuCategory/All-Day Breakfast/Hash Bites.png'
import breakfastSausageBowl from '../assets/MenuCategory/All-Day Breakfast/Breakfast Sausage Bowl.png'
import wafflesNutellaSolo from '../assets/MenuCategory/All-Day Breakfast/2-pc. Waffles with Nutella Solo.png'
import wafflesNutellaCombo from '../assets/MenuCategory/All-Day Breakfast/2-pc. Waffles with Nutella Combo.png'
import wafflesAndChicken from '../assets/MenuCategory/All-Day Breakfast/2-pc. Waffles and Chicken.png'
import waffleWithMaple from '../assets/MenuCategory/All-Day Breakfast/2-pc. Waffle with Maple.png'
import waffleWithMapleAndSausage from '../assets/MenuCategory/All-Day Breakfast/2-pc. Waffle with Maple and Sausage.png'
import tastyChickenImage from '../assets/MenuCategory/TB Chicken Burger/Tasty Chicken.png'
import spicyChickenImage from '../assets/MenuCategory/TB Chicken Burger/Spicy Chicken.png'
import bltSpicyChickenImage from '../assets/MenuCategory/TB Chicken Burger/BLT Spicy Chicken.png'
import plantBasedWhopperImage from '../assets/MenuCategory/Plant-Based Whopper/Plant-Based Whopper.png'
import plantBasedWhopperJrImage from '../assets/MenuCategory/Plant-Based Whopper/Plant-Based Whopper Jr..png'
import flameGrilledBbhImage from '../assets/MenuCategory/Flame-Grilled Cheeseburger/Flame-Grilled BBQ Hamburger.png'
import tbSpecialImage from '../assets/MenuCategory/TB Special/TB Special.png'
import creamyParmChickenFilletImage from '../assets/MenuCategory/Chicken Rice Meals/Creamy Parm Chunky Chicken Fillet.png'
import mushroomGravyChickenFilletImage from '../assets/MenuCategory/Chicken Rice Meals/Mushroom Gravy Chunky Chicken Fillet.png'
import smokyBbqChickenFilletImage from '../assets/MenuCategory/Chicken Rice Meals/Smoky BBQ Chunky Chicken Fillet.png'
import chickenNuggets4PcImage from '../assets/MenuCategory/Ultimate Side Kicks/4-pc. Chicken Nuggets.png'
import chickenNuggets6PcImage from '../assets/MenuCategory/Ultimate Side Kicks/6-pc. Chicken Nuggets.png'
import chickenNuggets10PcImage from '../assets/MenuCategory/Ultimate Side Kicks/10-pc. Chicken Nuggets.png'
import angryDipImage from '../assets/MenuCategory/Ultimate Side Kicks/Angry Dip.png'
import hashBitesBucketImage from '../assets/MenuCategory/Ultimate Side Kicks/Bucket, Hash Bites.png'
import friesBucketImage from '../assets/MenuCategory/Ultimate Side Kicks/Bucket, Thick-Cut Fries.png'
import cheesyDipImage from '../assets/MenuCategory/Ultimate Side Kicks/Cheesy Dip.png'
import hashBitesImage from '../assets/MenuCategory/Ultimate Side Kicks/Hash Bites.png'
import onionRingsImage from '../assets/MenuCategory/Ultimate Side Kicks/Onion Rings.png'
import smokyBbqDipImage from '../assets/MenuCategory/Ultimate Side Kicks/Smoky BBQ.png'
import thickCutFriesImage from '../assets/MenuCategory/Ultimate Side Kicks/Thick Cut Fries.png'
import sweetBlackAffogatoImage from '../assets/MenuCategory/TB Cafe/Sweet Black Affogato-style.png'
import caramelEspressoSundaeImage from '../assets/MenuCategory/Desserts/Caramel Espresso Sundae.png'
import caramelSundaeImage from '../assets/MenuCategory/Desserts/Caramel Sundae.png'
import chocolateSundaeImage from '../assets/MenuCategory/Desserts/Chocolate Sundae.png'
import sundaeWithNutellaImage from '../assets/MenuCategory/Desserts/Sundae with Nutella.png'
import cocaColaFloatImage from '../assets/MenuCategory/Drinks/Coca-Cola Float.png'
import cokeOriginalTasteImage from '../assets/MenuCategory/Drinks/Coke Original Taske.png'
import icedTeaImage from '../assets/MenuCategory/Drinks/Iced Tea.png'
import rootbeerFloatImage from '../assets/MenuCategory/Drinks/Rootbeer Float.png'

export type BurgerVariation = { id: 'regular' | 'with-fries' | 'combo'; name: string; description: string; image: string; price: number }
export type Product = { id: number; name: string; description: string; price: number; rating: number; image: string; imageFit?: 'cover' | 'contain'; quickViewLabel?: 'VIEW BURGER' | 'View order'; variations?: BurgerVariation[] }
export const products: Product[] = [
  { id: 1, name: 'Crispy Chicken', description: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw', price: 129, rating: 5, image: burger1 },
  { id: 2, name: 'Ultimate Bacon', description: 'House patty, cheddar cheese, bacon, onion, mustard', price: 149, rating: 4.5, image: burger2 },
  { id: 3, name: 'Black Sheep', description: 'American cheese, tomato relish, avocado, lettuce, red onion', price: 159, rating: 4, image: burger3 },
  { id: 4, name: 'Vegan Burger', description: 'House patty, cheddar cheese, bacon, onion, mustard', price: 179, rating: 4.5, image: burger4 },
]
export const groupMealProducts: Product[] = ([
  { id: 5, name: "King Feast: Mix 'n Feast for 2", description: 'Burgers, sides, and drinks made for sharing', price: 499, rating: 5, image: groupMealFor2, imageFit: 'contain' },
  { id: 6, name: "King Feast: Mix 'n Feast for 3", description: 'A bigger mix of burgers, sides, and drinks', price: 699, rating: 5, image: groupMealFor3, imageFit: 'contain' },
  { id: 7, name: "King Feast: Mix 'n Feast for 4", description: 'A feast of burgers, sides, and drinks to share', price: 899, rating: 5, image: groupMealFor4, imageFit: 'contain' },
 ] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: 'Group Meal', description: product.description, image: product.image, price: product.price }],
}))
export const tbSaversProducts: Product[] = ([
  { id: 8, name: 'TB Savers Bundle 199', description: 'A tasty burger meal at a great value', price: 199, rating: 5, image: tbSavers199, imageFit: 'contain' },
  { id: 9, name: 'TB Savers Bundle 299', description: 'A bigger burger meal at a great value', price: 299, rating: 5, image: tbSavers299, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: 'TB Savers Bundle', description: product.description, image: product.image, price: product.price }],
}))
export const whopperProducts: Product[] = ([
  { id: 10, name: 'Whopper', description: 'Flame-grilled beef, lettuce, tomato, onion, pickles, and mayo', price: 199, rating: 5, image: whopperImage, imageFit: 'contain' },
  { id: 11, name: 'Whopper Jr.', description: 'Flame-grilled beef, lettuce, tomato, onion, pickles, and mayo', price: 149, rating: 5, image: whopperJrImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const fourCheeseWhopperProducts: Product[] = ([
  { id: 12, name: '4-Cheese Whopper', description: 'Flame-grilled beef with a rich blend of four cheeses', price: 249, rating: 5, image: fourCheeseWhopperImage, imageFit: 'contain' },
  { id: 13, name: '4-Cheese Whopper Jr.', description: 'A flame-grilled beef burger with four delicious cheeses', price: 199, rating: 5, image: fourCheeseWhopperJrImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const xtraLongChickenProducts: Product[] = ([
  { id: 14, name: 'X-tra Long Chicken Sandwich', description: 'Crispy chicken, fresh lettuce, and creamy mayonnaise', price: 229, rating: 5, image: xtraLongChickenImage, imageFit: 'contain' },
  { id: 15, name: 'X-tra Long Chicken Jr. Sandwich', description: 'Crispy chicken, fresh lettuce, and creamy mayonnaise', price: 179, rating: 5, image: xtraLongChickenJrImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const allDayBreakfastProducts: Product[] = ([
  { id: 16, name: 'Waffle Sausage King with Egg', description: 'Savory sausage and egg in a warm waffle sandwich', price: 149, rating: 5, image: waffleSausageWithEgg, imageFit: 'contain' },
  { id: 17, name: 'Waffle Sausage King with Cheese', description: 'Savory sausage and melted cheese in a warm waffle sandwich', price: 159, rating: 5, image: waffleSausageWithCheese, imageFit: 'contain' },
  { id: 18, name: 'Hash Bites', description: 'Golden, crispy potato bites', price: 59, rating: 5, image: hashBites, imageFit: 'contain' },
  { id: 19, name: 'Breakfast Sausage Bowl', description: 'A hearty bowl with savory breakfast sausage', price: 129, rating: 5, image: breakfastSausageBowl, imageFit: 'contain' },
  { id: 20, name: '2-pc. Waffles with Nutella Solo', description: 'Two waffles served with rich Nutella', price: 119, rating: 5, image: wafflesNutellaSolo, imageFit: 'contain' },
  { id: 21, name: '2-pc. Waffles with Nutella Combo', description: 'Two waffles with Nutella in a satisfying combo', price: 179, rating: 5, image: wafflesNutellaCombo, imageFit: 'contain' },
  { id: 22, name: '2-pc. Waffles and Chicken', description: 'Two waffles served with crispy chicken', price: 199, rating: 5, image: wafflesAndChicken, imageFit: 'contain' },
  { id: 23, name: '2-pc. Waffle with Maple', description: 'Two waffles drizzled with maple syrup', price: 99, rating: 5, image: waffleWithMaple, imageFit: 'contain' },
  { id: 24, name: '2-pc. Waffle with Maple and Sausage', description: 'Two maple waffles served with savory sausage', price: 149, rating: 5, image: waffleWithMapleAndSausage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const tbChickenBurgerProducts: Product[] = ([
  { id: 25, name: 'Tasty Chicken', description: 'Crispy chicken fillet with fresh lettuce and creamy mayonnaise', price: 149, rating: 5, image: tastyChickenImage, imageFit: 'contain' },
  { id: 26, name: 'Spicy Chicken', description: 'Spicy crispy chicken fillet with fresh lettuce and mayonnaise', price: 169, rating: 5, image: spicyChickenImage, imageFit: 'contain' },
  { id: 27, name: 'BLT Spicy Chicken', description: 'Spicy chicken with bacon, lettuce, and tomato', price: 189, rating: 5, image: bltSpicyChickenImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const plantBasedWhopperProducts: Product[] = ([
  { id: 29, name: 'Plant-Based Whopper', description: 'Plant-based patty with lettuce, tomato, onion, pickles, and mayo', price: 229, rating: 5, image: plantBasedWhopperImage, imageFit: 'contain' },
  { id: 30, name: 'Plant-Based Whopper Jr.', description: 'Plant-based patty with lettuce, tomato, onion, pickles, and mayo', price: 179, rating: 5, image: plantBasedWhopperJrImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const flameGrilledProducts: Product[] = [{
  id: 31,
  name: 'Flame-Grilled BBQ Hamburger',
  description: 'Flame-grilled beef patty topped with BBQ sauce',
  price: 129,
  rating: 5,
  image: flameGrilledBbhImage,
  imageFit: 'contain',
  quickViewLabel: 'VIEW BURGER',
  variations: [{ id: 'regular', name: 'Flame-Grilled BBQ Hamburger', description: 'Flame-grilled beef patty topped with BBQ sauce', image: flameGrilledBbhImage, price: 129 }],
}]
export const tbSpecialProducts: Product[] = [{
  id: 33,
  name: 'TB Special',
  description: 'A tasty signature burger with fresh toppings',
  price: 199,
  rating: 5,
  image: tbSpecialImage,
  imageFit: 'contain',
  quickViewLabel: 'VIEW BURGER',
  variations: [{ id: 'regular', name: 'TB Special', description: 'A tasty signature burger with fresh toppings', image: tbSpecialImage, price: 199 }],
}]
export const chickenRiceMealProducts: Product[] = ([
  { id: 34, name: 'Creamy Parm Chunky Chicken Fillet', description: 'Crispy chicken fillet with creamy parmesan sauce, served with rice', price: 199, rating: 5, image: creamyParmChickenFilletImage, imageFit: 'contain' },
  { id: 35, name: 'Mushroom Gravy Chunky Chicken Fillet', description: 'Crispy chicken fillet topped with savory mushroom gravy, served with rice', price: 199, rating: 5, image: mushroomGravyChickenFilletImage, imageFit: 'contain' },
  { id: 36, name: 'Smoky BBQ Chunky Chicken Fillet', description: 'Crispy chicken fillet with smoky BBQ sauce, served with rice', price: 199, rating: 5, image: smokyBbqChickenFilletImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const ultimateSideKicksProducts: Product[] = ([
  { id: 37, name: '4-pc. Chicken Nuggets', description: 'Four crispy chicken nuggets, perfect for a quick snack', price: 99, rating: 5, image: chickenNuggets4PcImage, imageFit: 'contain' },
  { id: 38, name: '6-pc. Chicken Nuggets', description: 'Six crispy chicken nuggets served golden and hot', price: 149, rating: 5, image: chickenNuggets6PcImage, imageFit: 'contain' },
  { id: 39, name: '10-pc. Chicken Nuggets', description: 'Ten crispy chicken nuggets made for sharing', price: 229, rating: 5, image: chickenNuggets10PcImage, imageFit: 'contain' },
  { id: 40, name: 'Angry Dip', description: 'A bold, spicy dipping sauce for your favorite sides', price: 25, rating: 5, image: angryDipImage, imageFit: 'contain' },
  { id: 41, name: 'Bucket of Hash Bites', description: 'A shareable bucket of crispy golden hash bites', price: 149, rating: 5, image: hashBitesBucketImage, imageFit: 'contain' },
  { id: 42, name: 'Bucket of Thick-Cut Fries', description: 'A generous bucket of thick-cut, crispy fries', price: 199, rating: 5, image: friesBucketImage, imageFit: 'contain' },
  { id: 43, name: 'Cheesy Dip', description: 'Creamy cheese dip for fries, nuggets, and more', price: 25, rating: 5, image: cheesyDipImage, imageFit: 'contain' },
  { id: 44, name: 'Hash Bites', description: 'Crispy bite-sized potatoes with a fluffy center', price: 59, rating: 5, image: hashBitesImage, imageFit: 'contain' },
  { id: 45, name: 'Onion Rings', description: 'Crispy battered onion rings with a sweet onion center', price: 99, rating: 5, image: onionRingsImage, imageFit: 'contain' },
  { id: 46, name: 'Smoky BBQ Dip', description: 'A smoky and tangy BBQ dipping sauce', price: 25, rating: 5, image: smokyBbqDipImage, imageFit: 'contain' },
  { id: 47, name: 'Thick-Cut Fries', description: 'Golden thick-cut fries with a crisp outside', price: 79, rating: 5, image: thickCutFriesImage, imageFit: 'contain' },
  { id: 48, name: 'Chicken Nuggets Sharing Pack', description: 'A larger serving of crispy chicken nuggets to share', price: 299, rating: 5, image: chickenNuggets10PcImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const tbCafeProducts: Product[] = [{
  id: 49,
  name: 'Sweet Black Affogato-style',
  description: 'A rich coffee-inspired treat with a sweet, creamy finish',
  price: 129,
  rating: 5,
  image: sweetBlackAffogatoImage,
  imageFit: 'contain',
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: 'Sweet Black Affogato-style', description: 'A rich coffee-inspired treat with a sweet, creamy finish', image: sweetBlackAffogatoImage, price: 129 }],
}]
export const drinkProducts: Product[] = ([
  { id: 54, name: 'Coca-Cola Float', description: 'Classic Coca-Cola topped with creamy vanilla soft serve', price: 89, rating: 5, image: cocaColaFloatImage, imageFit: 'contain' },
  { id: 55, name: 'Coke Original Taste', description: 'Refreshing Coca-Cola with its original, familiar taste', price: 59, rating: 5, image: cokeOriginalTasteImage, imageFit: 'contain' },
  { id: 56, name: 'Iced Tea', description: 'A cool, refreshing iced tea served chilled', price: 59, rating: 5, image: icedTeaImage, imageFit: 'contain' },
  { id: 57, name: 'Root Beer Float', description: 'Chilled root beer topped with creamy vanilla soft serve', price: 89, rating: 5, image: rootbeerFloatImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
export const dessertProducts: Product[] = ([
  { id: 50, name: 'Caramel Espresso Sundae', description: 'Creamy soft serve topped with caramel and espresso sauce', price: 99, rating: 5, image: caramelEspressoSundaeImage, imageFit: 'contain' },
  { id: 51, name: 'Caramel Sundae', description: 'Smooth vanilla soft serve drizzled with sweet caramel sauce', price: 79, rating: 5, image: caramelSundaeImage, imageFit: 'contain' },
  { id: 52, name: 'Chocolate Sundae', description: 'Smooth vanilla soft serve topped with rich chocolate sauce', price: 79, rating: 5, image: chocolateSundaeImage, imageFit: 'contain' },
  { id: 53, name: 'Sundae with Nutella', description: 'Creamy soft serve finished with a swirl of Nutella', price: 99, rating: 5, image: sundaeWithNutellaImage, imageFit: 'contain' },
] satisfies Product[]).map((product) => ({
  ...product,
  quickViewLabel: 'View order',
  variations: [{ id: 'regular', name: product.name, description: product.description, image: product.image, price: product.price }],
}))
const variationImages = [[burger1WithFries, burger1Combo], [burger2WithFries, burger2Combo], [burger3WithFries, burger3Combo], [burger4WithFries, burger4Combo]]
export function getProductVariations(product: Product): BurgerVariation[] { if (product.variations) return product.variations; const images = variationImages[product.id - 1] ?? variationImages[0]; return [{ id: 'regular', name: 'Regular Burger', description: 'Burger only', image: product.image, price: product.price }, { id: 'with-fries', name: 'Burger + Fries', description: 'Burger with crispy fries', image: images[0], price: product.price + 30 }, { id: 'combo', name: 'Combo Meal', description: 'Burger + fries + Coke', image: images[1], price: product.price + 50 }] }
