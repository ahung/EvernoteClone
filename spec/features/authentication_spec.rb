require 'spec_helper'

feature 'user sign up' do 
  
  it 'has a Sign Up link' do
    visit('/')
    expect(page).to have_content 'Sign Up'
  end
  
  feature 'signing up a new user', :js => true do

    it 'creates account and logs in' do
      visit('/')
      click_link('Sign Up')
      within('#sign-up-modal') do
        fill_in 'Username', :with => "test_user"
        fill_in 'Password', :with => 'testpassword'
        fill_in 'Confirm Password', :with => 'testpassword'
        click_button 'Create Account'
      end
      expect(page).to have_content 'Account Created!'
    end
    
  end
  
end

feature 'user log in' do
  
  it 'has a log in form' do
    visit('/')
    expect(page).to have_selector("input[type=submit][value='Log In']")
  end
  
  it 'raises error with invalid login credentials' do
    visit('/')
    click_button 'Log In'
    expect(page).to have_content "Invalid Username and/or Password"
  end
  
  feature "logging in" do
    before(:each) do
      User.create!({username: 'test', password: 'password'})
      visit('/')
      within('.navbar-form') do
        fill_in 'Username', :with => 'test'
        fill_in 'Password', :with => 'password'
        click_button 'Log In'
      end
    end
    
    it 'welcomes user' do
      expect(page).to have_content "Welcome"
    end
    
    it 'has log out button' do
      expect(page).to have_content "Log Out"
    end
    
    it 'logs out successfully' do
      click_link 'Log Out'
      expect(page).not_to have_content 'test'
    end

  end
  
end