const router = require('express').Router()
const ctrls = require('../controllers/coupon')
const { verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken], ctrls.createNewCoupon)
router.get('/', ctrls.getCoupons)
router.put('/:cid', [verifyAccessToken], ctrls.updateCoupon)
router.delete('/:cid', [verifyAccessToken], ctrls.deleteCoupon)

module.exports = router 