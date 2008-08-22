# This file is copied to ~/spec when you run 'ruby script/generate rspec'
# from the project root directory.
ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) + "/../config/environment")
require 'spec'
require 'spec/rails'
require 'pp'

Spec::Runner.configure do |config|
  # If you're not using ActiveRecord you should remove these
  # lines, delete config/database.yml and disable :active_record
  # in your config/boot.rb
  #config.use_transactional_fixtures = true
  #config.use_instantiated_fixtures  = false
  #config.fixture_path = RAILS_ROOT + '/spec/fixtures/'
  config.include FixtureReplacement

  # == Fixtures
  #
  # You can declare fixtures for each example_group like this:
  #   describe "...." do
  #     fixtures :table_a, :table_b
  #
  # Alternatively, if you prefer to declare them only once, you can
  # do so right here. Just uncomment the next line and replace the fixture
  # names with your fixtures.
  #
  # config.global_fixtures = :table_a, :table_b
  #
  # If you declare global fixtures, be aware that they will be declared
  # for all of your examples, even those that don't use them.
  #
  # You can also declare which fixtures to use (for example fixtures for test/fixtures):
  #
  # config.fixture_path = RAILS_ROOT + '/spec/fixtures/'
  #
  # == Mock Framework
  #
  # RSpec uses it's own mocking framework by default. If you prefer to
  # use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr
  #
  # == Notes
  # 
  # For more information take a look at Spec::Example::Configuration and Spec::Runner
end

def describe_rake_task(task_name, filename, &block)
  require "rake"

  describe "Rake task #{task_name}" do
    attr_reader :task

    before(:all) do
      @rake = Rake::Application.new
      Rake.application = @rake
      load filename
      @task = Rake::Task[task_name]
    end

    after(:all) do
      Rake.application = nil
    end

    def invoke!
      for action in task.instance_eval { @actions }
        instance_eval(&action)
      end
    end

    instance_eval(&block)
  end
end
def load_ticket_test_schema
  importer = RadicalDesigns::MysqlDumpImporter.new('tickets_test')
  importer.process("#{RAILS_ROOT}/spec/fixtures/tickets_test.sql.gz")
end
def load_preamp_test_data
  importer = RadicalDesigns::MysqlDumpImporter.new('preamp_test')
  importer.process("#{RAILS_ROOT}/spec/fixtures/preamp_test.sql")
end

def stub_authentication
  CASClient::Frameworks::Rails::Filter.stub!(:filter).and_return( true )
end
