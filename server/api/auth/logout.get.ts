/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     description: "Выход из системы"
 *     responses:
 *       200:
 *         description: "Успешный выход"
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 */
export default defineEventHandler((event) => {
    deleteCookie(event, 'auth-token')
    return {
        statusCode: 200
    }
})
