# frozen_string_literal: true

Jekyll::Hooks.register :site, :post_write do |site|
  next unless site.config['serving']

  %w[build_workbench.py build_audit.py].each do |tool|
    built = system('python', File.join(site.source, 'tools', tool), '--quiet')
    Jekyll.logger.warn 'Lab pages:', "#{tool} did not run (is Python installed?)" unless built
  end
end
