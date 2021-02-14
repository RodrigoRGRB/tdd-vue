jest.mock('@/store/actions')
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import UserProfile from '../../src/components/UserProfile'
import UserSearchForm from '../../src/components/UserSearchForm'
import actions from '../../src/store/actions'
import initialState from '../../src/store/state'
import UserView from '../../src/views/UserView'
import userFixture from './fixtures/user'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserView', () => {
    let state

    const build = () => {
        const wrapper = shallowMount(UserView, {
            localVue,
            store: new Vuex.Store({ state, actions }),
        })

        return {
            wrapper,
            userSearchForm: () => wrapper.findComponent(UserSearchForm),
            userProfile: () => wrapper.findComponent(UserProfile),
        }
    }

    beforeEach(() => {
        jest.resetAllMocks()
        state = { ...initialState }
    })

    it('Renders the component', () => {
        //arrange
        const { wrapper } = build()

        //asserts
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Renders main child components', () => {
        //arrange
        const { userProfile, userSearchForm } = build()

        expect(userSearchForm().exists()).toBe(true)
        expect(userProfile().exists()).toBe(true)
    })

    it('Passes a binded user prop to user profile component', () => {
        state.user = userFixture
        const { userProfile } = build()

        //asserts
        expect(userProfile().vm.user).toBe(state.user)
    })

    it('searches for a user when received "submitted"', () => {
        // arrange
        const expectedUser = 'kuroski'
        const { userSearchForm } = build()

        // act
        userSearchForm().vm.$emit('submitted', expectedUser)

        // assert
        expect(actions.SEARCH_USER).toHaveBeenCalled()
        expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({ username: expectedUser })
    })
})
