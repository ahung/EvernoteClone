require 'spec_helper'

feature 'user notebooks', :js => true do
  
  before(:each) do
    visit('/')
    click_link('Sign Up')
    within('#sign-up-modal') do
      fill_in 'Username', :with => "test_user"
      fill_in 'Password', :with => 'testpassword'
      fill_in 'Confirm Password', :with => 'testpassword'
      click_button 'Create Account'
    end
  end
  
  it 'has a default notebook' do
    expect(page).to have_content "test's Notebook"
  end
  
  it 'can create a new notebook' do
    
  end
  
end