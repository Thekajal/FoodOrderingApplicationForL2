
import { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets.js'

export const StoreContext = createContext(null)

const CART_STORAGE_KEY = 'dummy-food-cart'
const ORDERS_STORAGE_KEY = 'dummy-food-orders'
const LATEST_ORDER_ID_STORAGE_KEY = 'dummy-food-latest-order-id'
const CUSTOMER_ORDER_IDS_STORAGE_KEY = 'dummy-food-customer-order-ids'

const normalizeEmail = (email) => email?.trim().toLowerCase() || ''
const getOrderOwnerEmail = (order) => normalizeEmail(order.accountEmail || order.customerEmail)

export const ORDER_STATUS_STEPS = [
    'Order confirmed',
    'Preparing your food',
    'Packed and ready',
    'Out for delivery',
    'Delivered',
]

const StoreContextProvider = (props) => {

    const [cartItems, setCartItem] = useState(() => {
        const savedCartItems = localStorage.getItem(CART_STORAGE_KEY)
        return savedCartItems ? JSON.parse(savedCartItems) : {}
    })
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
        return savedOrders ? JSON.parse(savedOrders) : []
    })
    const [latestOrderId, setLatestOrderId] = useState(() => localStorage.getItem(LATEST_ORDER_ID_STORAGE_KEY) || '')
    const [customerOrderIds, setCustomerOrderIds] = useState(() => {
        const savedCustomerOrderIds = localStorage.getItem(CUSTOMER_ORDER_IDS_STORAGE_KEY)
        return savedCustomerOrderIds ? JSON.parse(savedCustomerOrderIds) : {}
    })

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    }, [orders])

    useEffect(() => {
        if (latestOrderId) {
            localStorage.setItem(LATEST_ORDER_ID_STORAGE_KEY, latestOrderId)
            return
        }

        localStorage.removeItem(LATEST_ORDER_ID_STORAGE_KEY)
    }, [latestOrderId])

    useEffect(() => {
        localStorage.setItem(CUSTOMER_ORDER_IDS_STORAGE_KEY, JSON.stringify(customerOrderIds))
    }, [customerOrderIds])

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item]
                }
            }
        }
        return totalAmount;
    }

    const createOrder = (orderPayload) => {
        const nextOrder = {
            ...orderPayload,
            accountEmail: normalizeEmail(orderPayload.accountEmail),
            customerEmail: normalizeEmail(orderPayload.customerEmail),
            createdAt: new Date().toISOString(),
        }

        const orderOwnerEmail = getOrderOwnerEmail(nextOrder)

        setOrders((prev) => [nextOrder, ...prev])
        setLatestOrderId(nextOrder.orderId)

        if (orderOwnerEmail) {
            setCustomerOrderIds((prev) => ({
                ...prev,
                [orderOwnerEmail]: nextOrder.orderId,
            }))
        }

        return nextOrder
    }

    const updateOrderStatus = (orderId, statusIndex) => {
        setOrders((prev) => prev.map((order) => {
            if (order.orderId !== orderId) {
                return order
            }

            return {
                ...order,
                statusIndex,
                status: ORDER_STATUS_STEPS[statusIndex],
            }
        }))
    }

    const getOrderById = (orderId) => orders.find((order) => order.orderId === orderId) || null
    const getLatestOrderForCustomer = (email) => {
        const normalizedEmail = normalizeEmail(email)

        if (!normalizedEmail) {
            return null
        }

        const customerOrderId = customerOrderIds[normalizedEmail]
        return customerOrderId ? getOrderById(customerOrderId) : null
    }
    const getOrdersForCustomer = (email) => {
        const normalizedEmail = normalizeEmail(email)

        if (!normalizedEmail) {
            return []
        }

        return orders.filter((order) => getOrderOwnerEmail(order) === normalizedEmail)
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        orders,
        latestOrderId,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getLatestOrderForCustomer,
        getOrdersForCustomer,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;